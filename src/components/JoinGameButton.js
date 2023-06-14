
  import { joinGame } from "../fireBaseFunctions/gameFunctions";
  import { useNavigate } from "react-router-dom";
  
  const JoinGameButton = (props) => {
  const navigate = useNavigate();

    const handleJoinGame = async (gameID) => {
      console.log(gameID);
      await joinGame(props.user, props.userName, gameID);
      navigate(`/game/${gameID}`);
    };

    const handleDeleteGame = async (gameID) => {
      console.log("first")
    }

    console.log(props)

    return (
      <div className="flex bg-black/70 backdrop-blur-sm hover:bg-purple-900 justify-around items-start px-2">
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => handleJoinGame(props.id)}
        >
          <h2>{props.name}</h2>
          <h3>players: {props.players}</h3>
        </button>
        {props.user === props.owner && (
          <button onClick={() => handleDeleteGame()} className="text-white">
            x
          </button>
        )}
      </div>
    );

}

export default JoinGameButton;