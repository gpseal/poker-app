import { joinGame, deleteGame } from "../../fireBaseFunctions/gameFunctions";
import { useNavigate } from "react-router-dom";

const JoinGameButton = (props) => {
  const navigate = useNavigate();

  const handleJoinGame = async (gameID) => {
    if (!props.currentPlayers.includes(props.user)) {
      await joinGame(props.user, props.userName, gameID);
    }
    navigate(`/game/${gameID}`);
  };

  const handleDeleteGame = async (gameID, user) => {
    await deleteGame(gameID, user);
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
      {props.user === props.owner && (
        <button
          onClick={() => handleDeleteGame(props.id, props.user)}
          className="text-white"
        >
          x
        </button>
      )}
    </div>
  );
};

export default JoinGameButton;
