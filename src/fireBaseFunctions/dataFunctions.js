import { collection, doc, getDoc, setDoc, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../components/Firestore";

export const getDocument = async (docRef) => {
  const docSnap = await getDoc(docRef);
  return docSnap;
};

// Add a new document in collection "cities"
export const createGame = async (owner, deck, name) => {
  await addDoc(collection(db, "games"), {
    name: name,
    owner: owner,
    players: 0,
    turn: 0,
    deck: deck || null,
  });
}
