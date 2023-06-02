
import { arrayUnion, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDeck } from "../cards/cardFunctions";
import { useState } from "react";
import { getDocument } from "./dataFunctions";

export const createGame = async (owner, deck, name, gameID) => {
    await setDoc(doc(db, "games", gameID), {
      name: name,
      owner: owner,
      players: 0,
      turn: 1,
      status: "waiting",
      deck: deck || null,
      current_players: [],
      scores: [],
    });
    return
  };

export const joinGame = async (user, gameID) => {
    const deck = await getDeck(gameID)
    const hand = deck?.slice(0, 5)
    const newDeck = deck?.slice(5)

    await updateDoc(doc(db,"games", gameID), {
        players: increment(1),
        deck: newDeck,
        current_players: arrayUnion(user)
    })

    console.log("joining game")

    const game = await getDoc(doc(db, "games", gameID))

    await setDoc(doc(db, "games", gameID, "players", user), {
        cards: hand,
        playerNum: game.data().players,
    })

  return
}

export const endTurn = async (gameID) => {
  await updateDoc(doc(db,"games", gameID), {
    turn: increment(1),
  })

  return
}

export const sendScore = async (gameID, score,) => {
  console.log("sending score")
  const scoreArray = await getDoc(doc(db,"games", gameID))
  const newScores = (scoreArray.data().scores)
  newScores.push(score)
  await updateDoc(doc(db,"games", gameID), {
    scores: newScores,
  })
}

export const findWinner = async (gameID, score) => {

}

