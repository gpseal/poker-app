import { collection, doc, getDoc, setDoc, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../components/Firestore";

export const getDocument = async (docRef) => {
  const docSnap = await getDoc(docRef);
  return docSnap;
};


