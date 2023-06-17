import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./Firestore";
import { useState, useEffect, useContext } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import JoinGameButton from "./JoinGameButton";
import { joinGame } from "../fireBaseFunctions/gameFunctions";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { listenForCollectionChanges } from "../fireBaseFunctions/dataFunctions";

const JoinGame = (props) => {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState();
  const [isLoading, setIsLoading] = useState();
  const { currentUser } = useContext(UserContext);

  const collRef = "games"

  useEffect(() => {
    // setIsLoading(true);
    const unsub = listenForCollectionChanges(collRef, setGameData);
    // setIsLoading(false);
    return unsub;

  }, []);

  return (
    <>
      {gameData && (
        <div className="w-full sm:ml-1">
          <h2 className="flex items-center justify-center w-full my-1 sm:mt-0 h-16 bg-black/70 backdrop-blur-sm">
            Join A Game
          </h2>
          <div className="container m-auto gap-1 grid grid-cols-3 w-full max-h-full overflow-auto">
            {gameData.map((game) => (
              <>
                {(game?.data.status === "waiting" && game?.data.players < 5) && (
                  <JoinGameButton
                    key={game.id}
                    name={game.data.name}
                    id={game.id}
                    players={game.data.players}
                    user={currentUser}
                    userName={props.userName}
                    owner={game.data.owner}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default JoinGame;