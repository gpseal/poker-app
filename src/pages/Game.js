import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "../components/Firestore";
import UserContext from "../components/UserContext";
import PlayerHand from "../components/PlayerHand";
import GameMenu from "../components/GameMenu";
import WaitForGameStart from "../components/WaitForGameStart";
import { checkWinner, sendWinningHand } from "../fireBaseFunctions/gameFunctions";
import ResultHand from "../components/ResultHand";
import GameResult from "../components/GameResult";

const Game = () => {
    const { currentUser } = useContext(UserContext);
    const params = useParams();
    const gameID = params.id;
    const [gameData, setGameData] = useState();
    const [winner, setWinner] = useState("");
    const [turnOver, setTurnOver] = useState(false);
    const [userData, setUserData] = useState();

    console.log(userData);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "games", gameID),(doc) => {
            setGameData(doc.data())
        })
        return unsub
    }, [])

    useEffect(() => {
      const unsub = onSnapshot(doc(db, "games", gameID, "players", currentUser), (doc) => {
        setUserData(doc.data());
      });
      return unsub;
    }, []);


    useEffect(() => {
        if (userData?.score) {
          const result = checkWinner(gameData, userData, gameID);
          setWinner(result)
        }
        return
    }, [gameData?.scores])

    if (winner) {
      sendWinningHand(gameID, userData?.cards, gameData?.winningHand, userData?.name);
    }

    useEffect(() => {
        if (gameData && userData?.score && !turnOver) {
          if (userData?.playerNum < gameData?.turn) {
            setTurnOver(true);
          }
        }
        return
    }, [gameData?.turn])
    
    return (
      <div
        className={`bg-gradient-to-t from-cyan-900 from-40% via-cyan-800 via-50% to-sky-950 to-90% h-full`}
      >
        {gameData?.status === "waiting" && (
          <WaitForGameStart
            gameName={gameData?.name}
            owner={gameData?.owner}
            user={currentUser}
            players={gameData?.player_names}
            gameID={gameID}
          />
        )}
        {gameData?.turn > gameData?.players && (
          <GameResult
            winner={winner}
            yourHand={userData?.cards}
            winningHand={gameData?.winningHand}
            winningName={gameData?.winningName}
          />
        )}
        <div className="flex">
          <GameMenu
            players={gameData?.player_names}
            turn={gameData?.turn}
            score={userData?.score}
          />
          <div className="flex flex-col flex items-center w-4/5 mt-[25vh]">
            <div>
              <PlayerHand
                gameID={gameID}
                currentUser={currentUser}
                turn={gameData?.turn}
                players={gameData?.players}
                gameOver={turnOver}
                userData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Game