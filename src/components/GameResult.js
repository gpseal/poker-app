import ResultHand from "./ResultHand";

const GameResult = (props) => {
    return (
      <div
        className={`z-30 w-screen h-screen ${
          props?.winner ? "bg-winning-back" : "bg-loosing-back"
        } bg-cover flex flex-col justify-center items-center bg-center`}
      >
        <div className="bg-black/70 flex flex-col justify-center items-center py-5 px-2 sm:px-10 backdrop-blur-sm border border-pink-500">
          <h1 className="mb-5">
            {props.winner ? "You're a Winner!" : "You Lost, Looser"}
          </h1>
          <ResultHand cards={props.yourHand} />
          {props.winner ? (
            <h2 className="mt-5">Keep it up!</h2>
          ) : (
            <>
              <h2 className="my-5">{props.winningName} had the Winning Hand:</h2>
              <ResultHand cards={props.winningHand} />
            </>
          )}
        </div>
      </div>
    );
}

export default GameResult