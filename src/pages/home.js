import Login from "../components/authentication/Login"
import LogOut from "../components/authentication/Logout";
import UserContext from "../components/UserContext";
import { useState, useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDocument } from "../fireBaseFunctions/dataFunctions";
import CreateGame from "../components/CreateGame";
import JoinGame from "../components/JoinGame";

const HomePage = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [userProfile, setUserProfile] = useState()
    const docRef = doc(db, "users", currentUser)
    
    useEffect(() => {
        getDocument(docRef).then(data => {
                setUserProfile(data)
            })
    },[])

    return (
      <div className="flex justify-center w-screen">
      <div className="flex flex-col content-center">
        Welcome {userProfile?.data().name}
        <LogOut />
        <CreateGame />
        <JoinGame />
      </div>
      </div>
    );
}

export default HomePage