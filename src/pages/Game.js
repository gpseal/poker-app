import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "../components/Firestore";
import UserContext from "../components/UserContext";
import PlayerHand from "../components/PlayerHand";
import { sendScore } from "../fireBaseFunctions/gameFunctions";
import { findWinner } from "../fireBaseFunctions/gameFunctions";
import GameMenu from "../components/GameMenu";
import WaitForGameStart from "../components/WaitForGameStart";
import { checkWinner } from "../fireBaseFunctions/gameFunctions";


const Game = () => {
    const { currentUser } = useContext(UserContext);
    const params = useParams();
    const gameID = params.id;
    const [gameData, setGameData] = useState();
    const [result, setResult] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [userData, setUserData] = useState();

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
          const result = checkWinner(gameData, userData);
          setResult(result)
        }
        return
    }, [gameData?.scores])

    useEffect(() => {
        if (gameData && userData?.score && !gameOver) {
          if (userData?.playerNum < gameData?.turn) {
            setGameOver(true);
          }
        }
        return
    }, [gameData?.turn])
    
    return (
      <div
        className={`bg-gradient-to-t from-cyan-800 from-40% via-cyan-800 via-50% to-cyan-900 to-90% `}
      >
        {gameData?.status === "waiting" && (
          <WaitForGameStart
            owner={gameData?.owner}
            user={currentUser}
            players={gameData?.player_names}
            gameID={gameID}
          />
        )}
        <div className="flex">
          <GameMenu
            players={gameData?.player_names}
            turn={gameData?.turn}
            score={userData?.score}
          />
          <div className="flex h-screen flex-col flex items-center w-4/5 pt-[25vh]">
            <div className="bg-red-100 h-16">
              {result && (
                <div className="bg-black w-64 h-16 flex items-center justify-center bg-opacity-80 shadow-lg border-2 border-slate-500">
                  <h2>{result}</h2>
                </div>
              )}
            </div>
            <div>
              <PlayerHand
                gameID={gameID}
                currentUser={currentUser}
                turn={gameData?.turn}
                players={gameData?.players}
                gameOver={gameOver}
                userData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Game