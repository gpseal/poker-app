import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "./Firestore";
import { useEffect, useState, useContext } from "react";
import Card from "../cards/Card";
import { ButtonStandard } from "./buttons/buttons";
import { swapCards } from "../cards/cardFunctions";
import { endTurn } from "../fireBaseFunctions/gameFunctions";
import { sendScore } from "../fireBaseFunctions/gameFunctions";
import { CalculateScoreNew } from "../cards/Scoring";

const PlayerHand = (props) => {
    const [playerHand, setPlayerHand] = useState();
    const [playerNum, setPlayerNum] = useState();
    const [activeCards, setActiveCards] = useState([]);
    const [isMyTurn, setIsMyTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [turnOver, setTurnOver] = useState(false);
    const [playerScore, setplayerScore] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "games", props.gameID, "players", props.currentUser),(doc) => {
            setPlayerHand(doc.data().cards)
            setPlayerNum(doc.data().playerNum)
        })
        return unsub
    }, [])

    useEffect(() => {
        console.log(playerNum)
        if (playerHand) {
            setplayerScore(CalculateScoreNew(playerHand));
        }
        // seting player turn
        props.turn == playerNum ? setIsMyTurn(true) : setIsMyTurn(false)
        console.log(props.turn)
        // sends score during next players turn
        if (props.turn == playerNum+1) {
            console.log("object")
            sendScore(props.gameID, playerScore)
        }
        // ending game after all players have had a turn
        props.turn > props.players ? setGameOver(true) : setGameOver(false)
    }, [props.turn, playerHand])

    useEffect(() => {
        if (gameOver) {
            // findWinner(score)
        }
    }, [gameOver])


    return(<>
        {gameOver && <div>Game Complete</div>}
        <div className="flex self-end">
            {playerHand?.map((card, index) => <Card cardId={index} key={card.suit+card.value} card={card} activeCards={activeCards} setActiveCards={setActiveCards}/>
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