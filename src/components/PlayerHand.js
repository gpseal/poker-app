import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "./Firestore";
import { useEffect, useState, useContext } from "react";
import Card from "../cards/Card";

const PlayerHand = (props) => {
    const [playerHand, setPlayerHand] = useState();
    const [activeCards, setActiveCards] = useState([]);

    console.log(activeCards)


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "games", props.gameID, "players", props.currentUser),(doc) => {
            setPlayerHand(doc.data().cards)
        })
        return unsub
    }, [])

    return(
        <div className="flex">
            {playerHand?.map((card, index) => <Card id={index} card={card} activeCards={activeCards} setActiveCards={setActiveCards}/>
            // <img className="mr-5 shadow-card rounded-xl" src={card.image} alt={card.card+card.suit}/>
            )}
        </div>
    )
}

export default PlayerHand