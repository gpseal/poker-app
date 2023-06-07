import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "../components/Firestore";
import UserContext from "../components/UserContext";
import PlayerHand from "../components/PlayerHand";
import GameMenu from "../components/GameMenu";
import WaitForGameStart from "../components/WaitForGameStart";
import { checkWinner, sendWinningHand } from "../fireBaseFunctions/gameFunctions";
import WinningHand from "../components/WinningHand";

const Game = () => {
    const { currentUser } = useContext(UserContext);
    const params = useParams();
    const gameID = params.id;
    const [gameData, setGameData] = useState();
    const [result, setResult] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [userData, setUserData] = useState();

    console.log(gameData);

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
          setResult(result)
        }
        return
    }, [gameData?.scores])

    if (result === "You're a Winner!") {
      sendWinningHand(gameID, userData.cards, gameData?.winningHand);
    }

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
        className={`bg-gradient-to-t from-cyan-900 from-40% via-cyan-800 via-50% to-sky-950 to-90% h-full`}
      >
        {/* {gameData?.status === "waiting" && (
          <WaitForGameStart
            gameName={gameData?.name}
            owner={gameData?.owner}
            user={currentUser}
            players={gameData?.player_names}
            gameID={gameID}
          />
        )} */}
        <div className="flex">
          <GameMenu
            players={gameData?.player_names}
            turn={gameData?.turn}
            score={userData?.score}
          />
          <div className="flex flex-col flex items-center w-4/5">
            <div className="flex h-60 flex-wrap w-full justify-center pb-3">
              {gameData?.winningHand && result !== "You're a Winner!" && (
                <>
                  <h2 className="w-full text-center">The Winning Hand</h2>
                  <WinningHand cards={gameData?.winningHand} />
                </>
              )}
            </div>
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