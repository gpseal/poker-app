import { signOut } from "firebase/auth";
import { auth } from '../Firestore';
import { ButtonStandard } from "../buttons/buttons";

const LogOut = () => {

    return(
        <ButtonStandard onClick={() => signOut(auth)} text={"Sign Out"}/>
    )
}

export default LogOut;