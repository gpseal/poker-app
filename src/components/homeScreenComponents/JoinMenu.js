import { useState, useEffect, useContext } from "react";
import { InlineLoading } from "../misc/Loading";
import JoinGameButton from "./JoinGameButton";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { listenForCollectionChanges } from "../../fireBaseFunctions/dataFunctions";

const JoinGameMenu = (props) => {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState();
  const [isLoading, setIsLoading] = useState();
  const { currentUser } = useContext(UserContext);

  const collRef = "games";

  useEffect(() => {
    // setIsLoading(true);
    const unsub = listenForCollectionChanges(collRef, setGameData);
    // setIsLoading(false);
    return unsub;
  }, []);

  return (
    <>
      <div className="w-full sm:ml-1 lg:ml-0">
        <h2 className="flex items-center justify-center w-full my-1 sm:mt-0 lg:mt-1 py-2 bg-black/70 backdrop-blur-md">
          Join A Game
        </h2>
        {!gameData ? (
          <InlineLoading />
        ) : (
          <div className="container m-auto gap-1 grid grid-cols-3 w-full max-h-full overflow-auto">
            {gameData?.map((game) => (
              <div key={game.id} data-testid={game.id}>
                <JoinGameButton
                  name={game.data.name}
                  id={game.id}
                  players={game.data.players}
                  user={currentUser}
                  userName={props.userName}
                  owner={game.data.owner}
                  status={game.data.status}
                  currentPlayers={game.data.current_players}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default JoinGameMenu;
