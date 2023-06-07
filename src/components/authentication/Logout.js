import { signOut } from "firebase/auth";
import { auth } from '../Firestore';
import { ButtonStandard } from "../buttons/buttons";

const LogOut = () => {
    return(<button className="w-full bg-black/70 mt-1 py-2 hover:bg-red-800/80
    backdrop-blur-sm"
    onClick={() => signOut(auth)}><h2>Sign Out</h2></button>)
}

export default LogOut;