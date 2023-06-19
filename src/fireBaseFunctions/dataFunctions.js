import { collection, doc, getDoc, setDoc, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../components/Firestore";

export const getDocument = async (docRef, setData) => {
  try {
    const docSnap = await getDoc(docRef);
    setData(docSnap.data());
    return ;
  } catch (error) {
    alert(error)
  }
};

export const listenForChanges = (ref, setData) => {
  try {
    const unsub = onSnapshot(doc(db, ref), (doc) => {
        setData(doc.data());
    });
    return unsub;
  } catch (error) {
    alert(error)
  }
}

export const listenForCollectionChanges = (ref, setData) => {
  try {
    const unsub = onSnapshot(collection(db, ref), (collection) => {
      const collectionData = [];
      collection.forEach((item) => {
        collectionData.push({
          id: item.id,
          data: item.data(),
        });
      });
      setData(collectionData);
    });
    return unsub;
  } catch (error) {
    alert(error);
  }
};
