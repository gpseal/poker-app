
import { arrayUnion, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDeck } from "../cards/cardFunctions";

export const createGame = async (owner, deck, name, gameID) => {
    await setDoc(doc(db, "games", gameID), {
      name: name,
      owner: owner,
      players: 0,
      turn: 1,
      status: "waiting",
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

}