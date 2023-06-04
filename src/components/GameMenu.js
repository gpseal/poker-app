const GameMenu = (props) => {
    console.log(props.turn)
    return (
      <>
        <div className="backdrop-blur-sm h-screen w-1/5">
          <h1 className="bg-black bg-opacity-20 h-20 flex justify-center my-auto">Menu</h1>
          {props.players?.map((player, i) => (
            <div className={`h-20 flex justify-center bg-black bg-opacity-${i+1 === props.turn ? 50 : 20} mt-1`}>
              <h2 className="my-auto">{player}</h2>
            </div>
          ))}
          <div className="w-full h-full bg-black bg-opacity-20 mt-1"></div>
        </div>
      </>
    );
}

export default GameMenu