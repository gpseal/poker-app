import { signOut } from "firebase/auth";
import { auth } from '../Firestore';

const SignOut = () => {

    return(
        <button onClick={signOut(auth)}>Sign Out</button>
    )
}

export default SignOut