
import { arrayUnion, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDeck } from "../cards/cardFunctions";

export const createGame = async (owner, deck, name, gameID) => {
    await setDoc(doc(db, "games", gameID), {
      name: name,
      owner: owner,
      players: 0,
      turn: 0,
      deck: deck || null,
      current_players: [],
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
    
    await setDoc(doc(db, "games", gameID, "players", user), {
        cards: hand,
    })

    return
}