import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "./Firestore";
import { useEffect, useState, useContext } from "react";

const PlayerHand = (props) => {
    const [playerHand, setPlayerHand] = useState();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "games", props.gameID, "players", props.currentUser),(doc) => {
            setPlayerHand(doc.data().cards)
        })
        return unsub
    }, [])

    return(
        <div className="flex">
        {playerHand?.map((card) => <img className="mr-5 shadow-card rounded-xl" src={card.image} alt={card.card+card.suit}/>
        )}
    </div>
    )
}

export default PlayerHand