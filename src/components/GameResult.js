import ResultHand from "./ResultHand";
import { ButtonStandard } from "./buttons/buttons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../components/Firestore";
import deck from "./cards/deck";
import { shuffle } from "./cards/cardFunctions";
import { getDeck } from "./cards/cardFunctions";


const GameResult = (props) => {

  const navigate = useNavigate();
  
  const exitGame = () => {
    navigate(`/`);
  }

  const [playAgain, setPlayAgain] = useState(false)

  const dealAgain = async (gameID, user, playersRestarting, numOfPlayers, deck, shuffle) => {
    setPlayAgain(true)
    // sets number of players restarting game, when all have elected to restarts, game will begin
    await updateDoc(
      doc(db, "games", gameID),
      {
        playersRestarting: increment(1),
      }
    );

    // first player to restart will deal new deck
    if (playersRestarting === 0) {
      shuffle(deck)
      await setDoc(doc(db, "games", gameID), {
        deck: deck || null,
      }, { merge: true });
    }

    const newDeck = await getDeck(gameID);
    const hand = newDeck?.slice(0, 5);
    const deckReduced = newDeck?.slice(5);

    await updateDoc(doc(db, "games", gameID), {
        deck: deckReduced || null,
    });

    // change player hand for new 5 from new deck
    await updateDoc(doc(db, "games", gameID, "players", user), {
      cards: hand,
      score: deleteField(),
    });

    // after final player has elected to replay and have their cards, the game will resume
    if (playersRestarting === numOfPlayers - 1) {
      await updateDoc(doc(db, "games", gameID), {
        turn: 1,
        status: "playing",
        scores: [],
        winningName: "",
        playersRestarting: 0,
        winningHand: [],
      }, { merge: true });
      setPlayAgain(false);
    }
  }

  return (
      <div
        className={`z-30 w-screen h-screen ${
          props?.winner ? "bg-winning-back" : "bg-loosing-back"
        } bg-cover flex flex-col justify-center items-center bg-center`}
      >
        <div className="bg-black/70 flex flex-col justify-center items-center py-1 px-2 sm:px-10 backdrop-blur-sm border border-pink-500 pb-4 lg:py-8">
          {!playAgain ? <><h1 className="mb-3 lg:mb-8">
            {props.winner ? "You're a Winner!" : "You Lost, Looser"}
          </h1>
          <ResultHand cards={props.yourHand} />
          {props.winner ? (
            <h2 className="my-5">Keep it up!</h2>
          ) : (
            <div className="mb-4 lg:mb-8">
              <h2 className="my-2 text-center lg:my-5">{props.winningName} had the Winning Hand:</h2>
              <ResultHand cards={props.winningHand} />
            </div>
          )} </> : <h1 className="text-center mb-3">Waiting for Players</h1>}
          <div>
            <ButtonStandard text={"exit"} onClick={exitGame}/>
            {!playAgain && <ButtonStandard text={"Deal again"} onClick={() => dealAgain(props.gameID, props.user, props.playersRestarting, props.numOfPlayers, deck, shuffle)}/>}
          </div>
        </div>
      </div>
    );
}

export default GameResult