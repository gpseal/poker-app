
  import { joinGame } from "../fireBaseFunctions/gameFunctions";
  import { useNavigate } from "react-router-dom";
  
  const JoinGameButton = (props) => {
  const navigate = useNavigate();

    const handleJoinGame = async (gameID) => {
      console.log(gameID);
      await joinGame(props.user, props.userName, gameID);
      navigate(`/game/${gameID}`);
    };


    return (
      <button
        className="bg-black/70 backdrop-blur-sm hover:bg-purple-900 h-24 flex flex-col items-center justify-center"
        onClick={() => handleJoinGame(props.id)}
      >
        <h2>{props.name}</h2>
        <h3>players: {props.players}</h3>
      </button>
    );

}

export default JoinGameButton;