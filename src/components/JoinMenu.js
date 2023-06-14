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
    // const unsub = onSnapshot(collection(db, "games"), (collection) => {
    //   const gameData = [];
    //   collection.forEach((game) => {
    //     gameData.push({
    //       id: game.id,
    //       name: game.data().name,
    //       players: game.data().players,
    //       status: game.data().status,
    //     });
    //   });
    //   setGameData(gameData);
    //   setIsLoading(false);
    // });
  }, []);

  console.log(gameData)

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
              {console.log(data.data.name)}
                {data?.data.status === "waiting" && (
                  <JoinGameButton
                    key={data.id}
                    name={data.data.name}
                    id={data.id}
                    players={data.data.players}
                    user={currentUser}
                    userName={props.userName}
                    owner={data.data.owner}
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