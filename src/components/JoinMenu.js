import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./Firestore";
import { useState, useEffect, useContext } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import JoinGameButton from "./JoinGameButton";
import { joinGame } from "../fireBaseFunctions/gameFunctions";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

const JoinGame = (props) => {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState();
  const [isLoading, setIsLoading] = useState();
  const { currentUser } = useContext(UserContext);

  const handleJoinGame = async (gameID) => {
    console.log("clicked");
    await joinGame(currentUser, props.userName, gameID);
    navigate(`/game/${gameID}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(collection(db, "games"), (collection) => {
      const gameData = [];
      collection.forEach((game) => {
        gameData.push({
          id: game.id,
          name: game.data().name,
          players: game.data().players,
          status: game.data().status,
        });
      });
      setGameData(gameData);
      setIsLoading(false);
    });
    return unsub;
  }, []);

  return (
    <>
      {gameData && (
        <>
          <h2 className="flex items-center justify-center w-full my-1 h-16 bg-black/70 backdrop-blur-sm">
            Join A Game
          </h2>
          <div className="container m-auto gap-1 grid grid-cols-3 w-full max-h-full overflow-auto">
            {gameData.map((data) => (
              <>
                {data?.status === "waiting" && (
                  <JoinGameButton
                    key={data.id}
                    name={data.name}
                    id={data.id}
                    players={data.players}
                    user={currentUser}
                    userName={props.userName}
                  />
                )}
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default JoinGame;
