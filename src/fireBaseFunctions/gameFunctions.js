import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDeck } from "../components/cards/cardFunctions";
import { getDocument } from "./dataFunctions";
import { CalculateScore } from "../components/Scoring";
import { shuffle } from "../components/cards/cardFunctions";
import deck from "../components/cards/deck";

export const gameRef = (gameID) => `games/${gameID}`;
export const playerRef = (gameID, user) => `games/${gameID}/players/${user}`;

export const createGame = async (owner, deck, name, gameID) => {
  try {
    await setDoc(doc(db, gameRef(gameID)), {
      name: name,
      owner: owner,
      players: 0,
      turn: 1,
      status: "waiting",
      deck: deck || null,
      current_players: [],
      player_names: [],
      scores: [],
      winningName: "",
      playersRestarting: 0,
    });
    return;
  } catch (error) {
    alert(error);
  }
};

export const joinGame = async (user, userName, gameID) => {
  try {
    const deck = await getDeck(gameID);
    const hand = deck?.slice(0, 5);
    const newDeck = deck?.slice(5);

    await updateDoc(doc(db, gameRef(gameID)), {
      players: increment(1),
      deck: newDeck,
      current_players: arrayUnion(user),
      player_names: arrayUnion(userName),
    });

    const game = await getDoc(doc(db, gameRef(gameID)));

    await setDoc(doc(db, playerRef(gameID, user)), {
      name: userName,
      cards: hand,
      playerNum: game.data().players,
    });

    return;
  } catch (error) {
    alert(error);
  }
};

export const leaveGame = async (user, userName, gameID, navigate) => {
  try {
    navigate(`/`);
    await deleteDoc(doc(db, playerRef(gameID, user)));
    await updateDoc(doc(db, gameRef(gameID)), {
      players: increment(-1),
      current_players: arrayRemove(user),
      player_names: arrayRemove(userName),
    });
    return;
  } catch (error) {
    alert(error);
  }
};

// player ends turn and gets score
export const endTurn = async (gameID, cards, user) => {
  try {
    const score = CalculateScore(cards);
    await setDoc(
      doc(db, playerRef(gameID, user)),
      {
        score: score,
      },
      { merge: true }
    );
    await updateDoc(doc(db, gameRef(gameID)), {
      scores: arrayUnion(score.score),
      turn: increment(1),
    });
    return;
  } catch (error) {
    alert(error);
  }
};

export const sendScore = async (gameID, score) => {
  try {
    const scoreArray = await getDoc(doc(db, gameRef(gameID)));
    const newScores = scoreArray?.data().scores;
    newScores.push(score);
    await updateDoc(doc(db, gameRef(gameID)), {
      scores: newScores,
    });
    return;
  } catch (error) {
    alert(error);
  }
};

export const findWinner = async (score, gameScores) => {
  try {
    if (score === Math.max(gameScores)) {
      return "Congratulations, you won!";
    }
    return "Sorry, you lost";
  } catch (error) {
    alert(error);
  }
};

export const beginGame = async (gameID) => {
  try {
    await updateDoc(doc(db, gameRef(gameID)), {
      status: "playing",
    });
  } catch (error) {
    alert(error);
  }
};

export const checkWinner = (gameData, userData) => {
  try {
    if (gameData?.scores.length === gameData?.players) {
      if (userData?.score.score === Math.max.apply(Math, gameData?.scores)) {
        // if player is the winner, send winning hand to game document
        return true;
      } else return false;
    }
  } catch (error) {
    alert(error);
  }
};

// send the winners hand to game document to display to losers
export const sendWinningHand = async (gameID, cards, winningHand, name) => {
  try {
    // if (!winningHand) {
    await updateDoc(doc(db, gameRef(gameID)), {
      winningHand: cards,
      winningName: name,
    });
    // }
    return;
  } catch (error) {
    alert(error);
  }
};

export const deleteGame = async (gameID, user) => {
  try {
    await deleteDoc(doc(db, playerRef(gameID, user)));
    await deleteDoc(doc(db, gameRef(gameID)));
    return;
  } catch (error) {
    alert(error);
  }
};

export const dealAgain = async (
  gameID,
  user,
  playersRestarting,
  numOfPlayers,
  setPlayAgainSetup
) => {
  try {
    setPlayAgainSetup(true);
    // sets number of players restarting game, when all have elected to restarts, game will begin
    await updateDoc(doc(db, gameRef(gameID)), {
      playersRestarting: increment(1),
    });

    // first player to restart will deal new deck
    if (playersRestarting === 0) {
      shuffle(deck);
      await setDoc(
        doc(db, gameRef(gameID)),
        {
          deck: deck || null,
        },
        { merge: true }
      );
    }

    // dealing new hand to player
    const newDeck = await getDeck(gameID);
    const hand = newDeck?.slice(0, 5);
    const deckReduced = newDeck?.slice(5);

    // setting game deck after hand has been dealt
    await updateDoc(doc(db, gameRef(gameID)), {
      deck: deckReduced || null,
    });

    // change player hand for new 5 from new deck
    await updateDoc(doc(db, playerRef(gameID, user)), {
      cards: hand,
      score: deleteField(),
    });

    // after final player has elected to replay and have their cards, the game will reset and resume
    if (playersRestarting === numOfPlayers - 1) {
      await updateDoc(
        doc(db, gameRef(gameID)),
        {
          turn: 1,
          status: "playing",
          scores: [],
          winningName: "",
          playersRestarting: 0,
          winningHand: [],
        },
        { merge: true }
      );
      setPlayAgainSetup(false);
    }
    return;
  } catch (error) {
    alert(error);
  }
};
