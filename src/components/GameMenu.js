const GameMenu = (props) => {
    return (
      <>
        <div className="backdrop-blur-sm h-screen w-1/5">
          <div className="bg-black bg-opacity-50 h-20 flex justify-center">
            <h1 className="my-auto">Menu</h1>
          </div>
          {props.players?.map((player, i) => (
            <div
              className={`py-5 flex justify-center bg-black bg-opacity-${
                i + 1 === props.turn ? 70 : 50
              } mt-1`}
            >
              <h2 className="my-auto">{player}</h2>
            </div>
          ))}
          <div
            className={`ease-in-out duration-500 flex flex-col h-32 items-center justify-center bg-black bg-opacity-50 ${
              props.score && "mt-1 mb-1"
            }`}
          >
            <div className={`ease-in-out duration-500 flex flex-col items-center opacity-${props.score ? 100 : 0}`}>
              <h2>Your Score</h2>
              <h1>{props.score}</h1>
            </div>
          </div>
          <div className="w-full h-full bg-black bg-opacity-50"></div>
        </div>
      </>
    );
}

export default GameMenu