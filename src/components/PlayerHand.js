import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "./Firestore";
import { useEffect, useState, useContext } from "react";
import Card from "../cards/Card";
import { ButtonStandard } from "./buttons/buttons";
import { swapCards } from "../cards/cardFunctions";

const PlayerHand = (props) => {
    const [playerHand, setPlayerHand] = useState();
    const [activeCards, setActiveCards] = useState([]);

    console.log(activeCards)
        console.log(props.gameID)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "games", props.gameID, "players", props.currentUser),(doc) => {
            setPlayerHand(doc.data().cards)
        })
        return unsub
    }, [])

    return(<>
        <div className="flex self-end">
            {playerHand?.map((card, index) => <Card id={index} card={card} activeCards={activeCards} setActiveCards={setActiveCards}/>
            )}
        </div>
        <ButtonStandard onClick={() => swapCards(props.gameID, activeCards, playerHand, props.currentUser)} text={"Swap Cards"} />
        </>
    )
}

export default PlayerHand