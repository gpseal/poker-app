import { collection, doc, getDoc, setDoc, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../components/Firestore";

export const getDocument = async (docRef) => {
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const listenForChanges = (ref, setData) => {
  const unsub = onSnapshot(ref, (doc) => {
      setData(doc.data());
  });
  return unsub;
}