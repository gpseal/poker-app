import { collection, doc, getDoc, setDoc, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../components/Firestore";

export const getDocument = async (docRef) => {
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const listenForChanges = (ref, setData) => {
  const unsub = onSnapshot(doc(db, ref), (doc) => {
      setData(doc.data());
  });
  return unsub;
}

export const listenForCollectionChanges = (ref, setData) => {
  const unsub = onSnapshot(collection(db, ref), (collection) => {
    const collectionData = [];
    collection.forEach((item) => {
      console.log(item.data())
      collectionData.push({
        id: item.id,
        data: item.data()
      })
    })
    setData(collectionData);
  });
  return unsub;
};


// const unsub = onSnapshot(collection(db, "games"), (collection) => {
//       const gameData = [];
//       collection.forEach((game) => {
//         gameData.push({
//           id: game.id,
//           name: game.data().name,
//           players: game.data().players,
//           status: game.data().status,
//         });
//       });