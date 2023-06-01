import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "./Firestore";
import { useEffect, useState, useContext } from "react";
import Card from "../cards/Card";
import { ButtonStandard } from "./buttons/buttons";
import { swapCards } from "../cards/cardFunctions";
import { endTurn } from "../fireBaseFunctions/gameFunctions";
import { CalculateScore } from "../fireBaseFunctions/gameFunctions";

const PlayerHand = (props) => {
    const [playerHand, setPlayerHand] = useState();
    const [playerNum, setPlayerNum] = useState();
    const [activeCards, setActiveCards] = useState([]);
    const [isMyTurn, setIsMyTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [playerScore, setplayerScore] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "games", props.gameID, "players", props.currentUser),(doc) => {
            setPlayerHand(doc.data().cards)
            setPlayerNum(doc.data().playerNum)
        })
        return unsub
    }, [])

    useEffect(() => {
        // seting player turn
        // props.turn == playerNum ? setIsMyTurn(true) : setIsMyTurn(false)
        // ending game after all players have had a turn
        // props.turn > props.players ? setGameOver(true) : setGameOver(false)
        const score = CalculateScore(playerHand);
        console.log(`score: ${score}`)
    }, [props.turn])


    return(<>
        {gameOver && <div>Game Complete</div>}
        <div className="flex self-end">
            {playerHand?.map((card, index) => <Card id={index} key={index} card={card} activeCards={activeCards} setActiveCards={setActiveCards}/>
            )}
        </div>
        {isMyTurn ? <div>
            <ButtonStandard onClick={() => swapCards(props.gameID, activeCards, playerHand, props.currentUser)} text={"Swap Cards"} />
            <ButtonStandard onClick={() => endTurn(props.gameID)} text={"Hold"} />
        </div> : <div>Waiting......</div>}
        </>
    )
}

export default PlayerHand