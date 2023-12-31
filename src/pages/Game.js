import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UserContext from "../components/UserContext";
import PlayerHand from "../components/gameComponents/PlayerHand";
import GameMenu from "../components/gameComponents/GameMenu";
import WaitForGameStart from "../components/gameComponents/WaitForGameStart";
import {
  checkWinner,
  sendWinningHand,
} from "../fireBaseFunctions/gameFunctions";
import GameResult from "../components/gameComponents/GameResult";
import { listenForChanges } from "../fireBaseFunctions/dataFunctions";
import { ScreenLoading } from "../components/misc/Loading";

const Game = () => {
  const { currentUser } = useContext(UserContext);
  const params = useParams();
  const gameID = params.id;
  const [gameData, setGameData] = useState();
  const [winner, setWinner] = useState("");
  const [turnOver, setTurnOver] = useState(false);
  const [userData, setUserData] = useState();

  const gameRef = `games/${gameID}`;
  const userRef = `games/${gameID}/players/${currentUser}`;

  useEffect(() => {
    const unsub = listenForChanges(gameRef, setGameData);
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = listenForChanges(userRef, setUserData);
    return unsub;
  }, []);

  useEffect(() => {
    if (userData?.score) {
      const result = checkWinner(gameData, userData, gameID);
      setTurnOver(true);
      setWinner(result);
    } else {
      setTurnOver(false);
      setWinner(null);
    }
    return;
  }, [gameData?.scores]);

  if (winner) {
    sendWinningHand(
      gameID,
      userData?.cards,
      gameData?.winningHand,
      userData?.name
    );
  }

  return (
    <>
      {!gameData && <ScreenLoading />}
      <div className="Game-Back">
        {gameData?.status === "waiting" && (
          <div>
            <WaitForGameStart
              gameName={gameData?.name}
              owner={gameData?.owner}
              user={currentUser}
              players={gameData?.player_names}
              gameID={gameID}
              userName={userData?.name}
            />
          </div>
        )}
        {gameData?.turn > gameData?.players && (
          <GameResult
            winner={winner}
            yourHand={userData?.cards}
            winningHand={gameData?.winningHand}
            winningName={gameData?.winningName}
            user={currentUser}
            gameID={gameID}
            numOfPlayers={gameData?.players}
            playersRestarting={gameData?.playersRestarting}
            userName={userData?.name}
          />
        )}
        <div className="flex flex-col sm:flex-row w-full h-full">
          <GameMenu
            players={gameData?.player_names}
            turn={gameData?.turn}
            score={userData?.score?.handName}
          />
          <div className="flex flex-col items-center justify-center lg:mt-[25vh] sm:w-4/5 h-full sm:mt-16">
            <div>
              <PlayerHand
                gameID={gameID}
                currentUser={currentUser}
                turn={gameData?.turn}
                players={gameData?.players}
                playerIDs={gameData?.current_players}
                turnOver={turnOver}
                userData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
