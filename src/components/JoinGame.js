
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./Firestore";
import { useState, useEffect } from "react";

const JoinGame = () => {

    const [gameData, setGameData] = useState([]);
    
    useEffect(() => {
        
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

        return unsub
    }, [])

    console.log(gameData)

    return(
        <div className=""><h1>Join A Game</h1>
            <div className="bg-blue-300">
                {gameData.map((data)=>{
                    return <div>{data.name}</div>
                })}
            </div>
        </div>
    )
}

export default JoinGame