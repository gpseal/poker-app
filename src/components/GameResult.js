import ResultHand from "./ResultHand";
import { ButtonStandard } from "./buttons/buttons";
import { useNavigate } from "react-router-dom";


const GameResult = (props) => {

  const navigate = useNavigate();
  
  const exitGame = () => {
    navigate(`/`);
  }

  return (
      <div
        className={`z-30 w-screen h-screen ${
          props?.winner ? "bg-winning-back" : "bg-loosing-back"
        } bg-cover flex flex-col justify-center items-center bg-center`}
      >
        <div className="bg-black/70 flex flex-col justify-center items-center py-1 px-2 sm:px-10 backdrop-blur-sm border border-pink-500 pb-4 lg:py-8">
          <h1 className="mb-3 lg:mb-8">
            {props.winner ? "You're a Winner!" : "You Lost, Looser"}
          </h1>
          <ResultHand cards={props.yourHand} />
          {props.winner ? (
            <h2 className="mt-5">Keep it up!</h2>
          ) : (
            <div className="mb-4 lg:mb-8">
              <h2 className="my-2 text-center lg:my-5">{props.winningName} had the Winning Hand:</h2>
              <ResultHand cards={props.winningHand} />
            </div>
          )}
        <ButtonStandard text={"exit"} onClick={exitGame}/>
        </div>
      </div>
    );
}

export default GameResult