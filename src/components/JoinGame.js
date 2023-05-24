
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./Firestore";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const JoinGame = () => {

    const [gameData, setGameData] = useState();
    const [isLoading, setIsLoading] = useState();
    
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
        })
        setIsLoading(false)
        return unsub
    }, [])

    return(
        <>
        {gameData && <div className=""><h1>Join A Game</h1>
            <div className="bg-blue-300">
                {gameData.map((data)=>{
                    return (
                      <div key={data.id}>
                        <Link to={`/game/${data.id}`}>{data.name}</Link>
                      </div>
                    );
                })}
            </div>
        </div>}
    </>)
}

export default JoinGame