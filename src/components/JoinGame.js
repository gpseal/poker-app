
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./Firestore";
import { useState, useEffect, useContext } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { joinGame } from "../fireBaseFunctions/gameFunctions";
import { useNavigate } from "react-router-dom";
import UserContext from "../components/UserContext";

const JoinGame = (props) => {

    const navigate = useNavigate();
    const [gameData, setGameData] = useState();
    const [isLoading, setIsLoading] = useState();
    const { currentUser } = useContext(UserContext);

    const handleJoinGame = async (gameID) => {
        console.log("clicked")
        await joinGame(currentUser, props.userName, gameID);
        navigate(`/game/${gameID}`);
    }
    
    useEffect(() => {
        setIsLoading(true)
        const unsub = onSnapshot(collection(db, "games"),(collection) => {
            const gameData = []
            collection.forEach((game) => {
                gameData.push(
                    {
                        id: game.id,
                        name: game.data().name,
                    }
                )
            })
            setGameData(gameData)
            setIsLoading(false)
        })
        return unsub
    }, [])

    return(
        <>
        {gameData && <div className=""><h1>Join A Game</h1>
            <div className="bg-blue-300">
                {gameData.map((data)=>{
                    return (
                      <div key={data.id}>
                        <button onClick={() => handleJoinGame(data.id)}>{data.name}</button>
                      </div>
                    );
                })}
            </div>
        </div>}
    </>)
}

export default JoinGame