
import { arrayUnion, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDeck } from "../cards/cardFunctions";
import { useState } from "react";
import { getDocument } from "./dataFunctions";
import { CalculateScore } from "../cards/Scoring";

export const createGame = async (owner, deck, name, gameID) => {
    await setDoc(doc(db, "games", gameID), {
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
    });
    return
  };

export const joinGame = async (user, userName, gameID) => {
    const deck = await getDeck(gameID)
    const hand = deck?.slice(0, 5)
    const newDeck = deck?.slice(5)

    await updateDoc(doc(db, "games", gameID), {
      players: increment(1),
      deck: newDeck,
      current_players: arrayUnion(user),
      player_names: arrayUnion(userName),
    });

    const game = await getDoc(doc(db, "games", gameID))

    await setDoc(doc(db, "games", gameID, "players", user), {
        name: userName,
        cards: hand,
        playerNum: game.data().players,
    })

  return
}

export const endTurn = async (gameID, cards, user) => {
  const score = CalculateScore(cards)
  await setDoc(doc(db, "games", gameID, "players", user), {
    score: score,
  }, { merge: true });

  // sendScore(gameID, score.score)
    await updateDoc(doc(db, "games", gameID), {
      scores: arrayUnion(score.score),
      turn: increment(1)
    });

  // await updateDoc(doc(db,"games", gameID), {
  //   turn: increment(1),
  // })
  return
}

export const sendScore = async (gameID, score) => {
  const scoreArray = await getDoc(doc(db,"games", gameID))
  const newScores = (scoreArray?.data().scores)
  newScores.push(score)
  await updateDoc(doc(db,"games", gameID), {
    scores: newScores,
  })
}

export const findWinner = async (score, gameScores) => {
  console.log(score)
  console.log(gameScores)
  console.log(Math.max(gameScores));
  if (score === Math.max(gameScores)) {
    return "Congratulations, you won!"
  }
  return "Sorry, you lost"
}

export const beginGame = async (gameID) => {
  console.log(gameID)
    await updateDoc(doc(db, "games", gameID), {
      status: "playing",
    });
}

export const checkWinner =  (gameData, userData) => {
  if (gameData?.scores.length === gameData?.players) {
    if (userData?.score.score === Math.max.apply(Math, gameData?.scores)) {
      // if player is the winner, send cards to be displayed to other players
      return(true);
    } else return(false);
  }
};

export const sendWinningHand = async (gameID, cards, winningHand, name) => {
  console.log(name)
    if (!winningHand) {
      await updateDoc(doc(db, "games", gameID), {
        winningHand: cards,
        winningName: name,
      });
    }
}

