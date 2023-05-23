import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../components/Firestore";

export const getDocument = async (docRef) => {
  const docSnap = await getDoc(docRef);
  return docSnap;
};

// Add a new document in collection "cities"
export const createGame = async (owner, deck) => {
  await addDoc(collection(db, "games"), {
    owner: owner,
    players: 0,
    turn: 0,
    deck: deck || null,
  });
}