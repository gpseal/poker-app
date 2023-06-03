import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "./Firestore";
import { useEffect, useState, useContext } from "react";
import Card from "../cards/Card";
import { ButtonStandard } from "./buttons/buttons";
import { swapCards } from "../cards/cardFunctions";
import { endTurn } from "../fireBaseFunctions/gameFunctions";
import { CalculateScoreNew } from "../cards/Scoring";

const PlayerHand = (props) => {
    const [playerHand, setPlayerHand] = useState();
    const [playerNum, setPlayerNum] = useState();
    const [activeCards, setActiveCards] = useState([]);
    const [isMyTurn, setIsMyTurn] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "games", props.gameID, "players", props.currentUser),(doc) => {
            setPlayerHand(doc.data().cards)
            props.setPlayerNum(doc.data().playerNum)
            setPlayerNum(doc.data().playerNum)
        })
        return unsub
    }, [])

    useEffect(() => {
        //calculate scoreof current hand
        if (playerHand) {
            props.setScore(CalculateScoreNew(playerHand));
        }
        // seting player turn
        props.turn === playerNum ? setIsMyTurn(true) : setIsMyTurn(false);
    }, [props.turn, playerHand])

 
    return (
      <>
        <div className="pb-10 h-16">
        {!props.gameOver && 
          <div className="flex justify-center">
            {isMyTurn ? (
              <>
                  {activeCards.length !==0  && <ButtonStandard
                    onClick={() =>
                      swapCards(
                        props.gameID,
                        activeCards,
                        playerHand,
                        props.currentUser
                      )
                    }
                    text={"Swap Cards"}
                  />}
                  <ButtonStandard
                    onClick={() => endTurn(props.gameID)}
                    text={"Hold"}
                  />
              </>
            ) : (
              <div>Waiting......</div>
            )}
          </div>}
        </div>
        <div className="flex">
          {playerHand?.map((card, index) => (
            <Card
              cardId={index}
              key={card.suit + card.value}
              card={card}
              activeCards={activeCards}
              setActiveCards={setActiveCards}
            />
          ))}
        </div>
      </>
    );
}

export default PlayerHand