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


const Game = () => {
    const { currentUser } = useContext(UserContext);
    const params = useParams();
    const gameID = params.id;
    const [gameData, setGameData] = useState();
    const [score, setScore] = useState();
    const [playerNum, setPlayerNum] = useState();
    const [result, setResult] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const bgColour = "red"

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "games", gameID),(doc) => {
            setGameData(doc.data())
        })
        return unsub
    }, [])

    useEffect(() => {
        if (gameData) {
            if (gameData?.scores.length === gameData?.players) {
                  if (score === Math.max.apply(Math, gameData?.scores)) {
                    setResult("You won!")
                }
            else setResult("Sorry, you lost")
            }
        }
        return
    }, [gameData?.scores])

    useEffect(() => {
        if (gameData && score && !gameOver) {
            if (playerNum < gameData?.turn) {
                sendScore(gameID, parseInt(score))
                setGameOver(true)
            };
        }
        return
    }, [gameData?.turn])
    
    return (
      <div
        className={`bg-gradient-to-t from-orange-500 from-40% via-orange-600 via-50% to-orange-600 to-90% `}
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
          <GameMenu players={gameData?.player_names} turn={gameData?.turn} />
          <div className="flex h-screen flex-col flex items-center w-4/5 pt-[25vh]">
            <div className="bg-red-100 h-16">
              {result && (
                <div className="bg-white w-64 h-16 flex items-center justify-center shadow-md border">
                  {result}
                </div>
              )}
            </div>
            <div>
              <PlayerHand
                gameID={gameID}
                currentUser={currentUser}
                turn={gameData?.turn}
                players={gameData?.players}
                setScore={setScore}
                setPlayerNum={setPlayerNum}
                gameOver={gameOver}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Game