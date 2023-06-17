import ResultHand from "./ResultHand";
import { ButtonStandard } from "./buttons/buttons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import deck from "./cards/deck";
import { dealAgain, leaveGame } from "../fireBaseFunctions/gameFunctions";

const GameResult = (props) => {

  const navigate = useNavigate();

  const [playAgainSetup, setPlayAgainSetup] = useState(false)

    useEffect(() => {}, [props?.numOfPlayers]);

  return (
    <div
      className={`z-30 w-screen h-screen ${
        props?.winner ? "bg-winning-back" : "bg-loosing-back"
      } bg-cover flex flex-col justify-center items-center bg-center`}
    >
      <div className="bg-black/70 flex flex-col justify-center items-center py-1 px-2 sm:px-10 backdrop-blur-sm border border-pink-500 pb-4 lg:py-8">
        {!playAgainSetup && props?.numOfPlayers > 1 ? (
          <>
            <h1 className="mb-3 lg:mb-8">
              {props.winner ? "You're a Winner!" : "You Lost, Looser"}
            </h1>
            <ResultHand cards={props.yourHand} />
            {props.winner ? (
              <h2 className="my-5">Keep it up!</h2>
            ) : (
              <div className="mb-4 lg:mb-8">
                <h2 className="my-2 text-center lg:my-5">
                  {props.winningName} had the Winning Hand:
                </h2>
                <ResultHand cards={props.winningHand} />
              </div>
            )}{" "}
          </>
        ) : (
          <h1 className="text-center mb-3">
            {props?.numOfPlayers === 1
              ? "Everyone has left!"
              : "Waiting for players"}
          </h1>
        )}
        <div>
          <ButtonStandard
            text={"exit"}
            onClick={async () =>
              await leaveGame(
                props.user,
                props.userName,
                props.gameID,
                navigate
              )
            }
          />
          {!playAgainSetup && props?.numOfPlayers > 1 && (
            <ButtonStandard
              text={"Deal again"}
              onClick={() =>
                dealAgain(
                  props.gameID,
                  props.user,
                  props.playersRestarting,
                  props.numOfPlayers,
                  setPlayAgainSetup
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GameResult