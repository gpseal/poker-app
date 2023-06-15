import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "./Firestore";
import { useEffect, useState, useContext } from "react";
import Card from "./cards/Card";
import { ButtonStandard } from "./buttons/buttons";
import { swapCards } from "./cards/cardFunctions";
import { endTurn } from "../fireBaseFunctions/gameFunctions";
import { CalculateScore } from "./cards/Scoring";
import HandOptions from "./HandOptions";

const PlayerHand = (props) => {
  const [activeCards, setActiveCards] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (props) {
      setUserData(props?.userData);
    }
  }, [props?.userData]);

  useEffect(() => {
    props.turn === userData?.playerNum ? setIsMyTurn(true) : setIsMyTurn(false);
  }, [props.turn, userData?.cards]);

  return (
    <>
      <div className="pb-10 h-16">
        {!props.turnOver && (
          <div className="flex justify-center">
            {isMyTurn ? (
              <HandOptions
                activeCards={activeCards}
                gameID={props?.gameID}
                userCards={userData?.cards}
                currentUser={props?.currentUser}
              />
            ) : (
              <h2>Wait Your Turn</h2>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-around sm:flex-nowrap">
        {userData?.cards.map((card, index) => (
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
};

export default PlayerHand;
