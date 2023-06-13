const GameMenu = (props) => {
    return (
      <>
        <div className="backdrop-blur-sm sm:h-screen sm:w-1/5">
          <div className="bg-black/50 h-10 sm:h-16 md:h-16 flex justify-center">
            <h1 className="my-auto text-xl lg:text-3xl">Who's Turn</h1>
          </div>
          <div className="flex sm:flex-col">
            {props.players?.map((player, i) => (
              <div
                key={i}
                className={`lg:py-5 py-1 flex justify-center bg-opacity-50 w-full ${
                  i + 1 === props.turn ? "bg-purple-500" : "bg-black"
                } sm:mt-1`}
              >
                <h2 className="my-auto">{player}</h2>
              </div>
            ))}
          </div>
          <div
            className={`ease-in-out duration-500 flex flex-col  items-center justify-center bg-black bg-opacity-50 ${
              props.score && "mt-1 mb-1"
            }`}
          >
            <div
              className={`ease-in-out duration-500 flex flex-col items-center opacity-${
                props.score ? 100 : 0
              }`}
            >
              {props?.score && (
                <div className="flex my-2 items-center">
                  <h2 className="text-xl lg:text-3xl mr-1">Score:</h2>
                  <h1 className="text-xl lg:text-3xl">{props.score}</h1>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-full bg-black bg-opacity-50"></div>
        </div>
      </>
    );
}

export default GameMenu