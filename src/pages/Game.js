import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "../components/Firestore";
import UserContext from "../components/UserContext";
import PlayerHand from "../components/PlayerHand";

const Game = () => {
    const { currentUser } = useContext(UserContext);
    const params = useParams();
    const gameID = params.id;
    const [gameData, setGameData] = useState();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "games", gameID),(doc) => {
            setGameData(doc.data())
        })
        return unsub
        }, [])

    console.log(gameID)

    return(<>
        <div className="bg-red-500 flex h-screen flex-col flex items-center justify-center">
            <div>GameID {params.id}</div>
            <div>
                <PlayerHand gameID={gameID} currentUser={currentUser} turn={gameData?.turn} players={gameData?.players}/>
            </div>
        </div>
        </>)
}

export default Game