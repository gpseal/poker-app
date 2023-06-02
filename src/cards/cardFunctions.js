import { getDocument } from "../fireBaseFunctions/dataFunctions";
import { db } from "../components/Firestore";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { endTurn } from "../fireBaseFunctions/gameFunctions";

export const shuffle = deck => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    return
  }

export const swapCards = async (gameID, cardsToSwap, hand, user) => {
  const deck = await getDeck(gameID)
  cardsToSwap.forEach(card => {
    hand[card] = deck[0]
    deck.shift();
  });
  await setDoc(doc(db, "games", gameID), {
    deck: deck,
  }, { merge: true });
  await setDoc(doc(db, "games", gameID, "players", user), {
    cards: hand,
  }, { merge: true });
  endTurn(gameID)
  return
}

export const getDeck = async (gameID) => {
  const game = await getDoc(doc(db, "games", gameID))
  const deck = game?.data().deck
  return deck
}