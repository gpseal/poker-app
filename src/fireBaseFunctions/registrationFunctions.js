import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firestore, auth } from "../components/Firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../components/Firestore";



// registers user and sets username in database
export const registerUser = async (
  email,
  password,
  userName,
  setCurrentUser
) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  setCurrentUser(user.user.uid);
  await setDoc(doc(db, "users", user.user.uid), {
    name: userName,
  });
  return
};

export const loginUser = async (email, password, setCurrentUser, setLoading) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  setCurrentUser(user.user.uid);
  return
};
