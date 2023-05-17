import { doc, getDoc } from "firebase/firestore";

export const getDocument = async (docRef) => {
  const docSnap = await getDoc(docRef);
  return docSnap;
};
