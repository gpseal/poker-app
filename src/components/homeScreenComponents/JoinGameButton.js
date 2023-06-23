import { joinGame, deleteGame } from "../../fireBaseFunctions/gameFunctions";
import { useNavigate } from "react-router-dom";

const JoinGameButton = (props) => {
  const navigate = useNavigate();

  const handleJoinGame = async (gameID) => {
    try {
      if (!props.currentPlayers.includes(props.user)) {
        await joinGame(props.user, props.userName, gameID);
      }
      navigate(`/game/${gameID}`);
    } catch (error) {
      
    }
  };

  const handleDeleteGame = async (gameID, user, currentPlayers) => {
    await deleteGame(gameID, user, currentPlayers);
  };

  return (
    <div
      id="testID"
      className={`flex py-1 backdrop-blur-md justify-around items-start px-2 ${
        props.status === "waiting"
          ? "hover:bg-black bg-black/70"
          : "bg-black/30"
      }`}
    >
      {props.status === "waiting" && props.players < 5 ? (
        <button
          data-testid={`${props.id}-button`}
          className="flex flex-col items-center justify-center w-full"
          onClick={() => handleJoinGame(props.id)}
        >
          <h2 id={`${props.id}-buttonTitle`}>{props.name}</h2>
          <h3>players: {props.players}</h3>
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <h2>{props.name}</h2>
          <h3>{props.status}</h3>
        </div>
      )}
      {props.user === props.owner && props.status === "complete" && (
        <button
          onClick={() =>
            handleDeleteGame(props.id, props.user, props.currentPlayers)
          }
          className="text-white"
        >
          x
        </button>
      )}
    </div>
  );
};

export default JoinGameButton;
