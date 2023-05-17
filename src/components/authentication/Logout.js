import { signOut } from "firebase/auth";
import { auth } from '../Firestore';

const LogOut = () => {

    return(
        <button onClick={() => signOut(auth)}>Sign Out</button>
    )
}

export default LogOut;