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
  setCurrentUser,
  setErrorMsg
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    setCurrentUser(user.user.uid);
    await setDoc(doc(db, "users", user.user.uid), {
      name: userName,
    });
  } catch (error) {
    setErrorMsg(error.code.split("/")[1].replaceAll("-", " "));
  }
  return;
};

export const loginUser = async (email, password, setCurrentUser, setErrorMsg) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    setCurrentUser(user.user.uid);
  } catch (error) {
    console.log(error.code);
    setErrorMsg(error.code.split("/")[1].replaceAll("-", " "));
  }
  return;
};
