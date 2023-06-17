
  import { joinGame, deleteGame } from "../fireBaseFunctions/gameFunctions";
  import { useNavigate } from "react-router-dom";
  
  const JoinGameButton = (props) => {
  const navigate = useNavigate();

    const handleJoinGame = async (gameID) => {
      console.log(gameID);
      await joinGame(props.user, props.userName, gameID);
      navigate(`/game/${gameID}`);
    };

    const handleDeleteGame = async (gameID) => {
      await deleteGame(gameID)
    }

    return (
      <div className="flex py-1 bg-black/70 backdrop-blur-md hover:bg-black justify-around items-start px-2">
        <button
          className="flex flex-col items-center justify-center w-full"
          onClick={() => handleJoinGame(props.id)}
        >
          <h2>{props.name}</h2>
          <h3>players: {props.players}</h3>
        </button>
        {props.user === props.owner && (
          <button onClick={() => handleDeleteGame(props.id)} className="text-white">
            x
          </button>
        )}
      </div>
    );

}

export default JoinGameButton;