import Login from "../components/authentication/Login"
import LogOut from "../components/authentication/Logout";
import UserContext from "../components/UserContext";
import { useState, useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../fireBaseFunctions/registrationFunctions";
import { getDocument } from "../fireBaseFunctions/dataFunctions";

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
      <div>
        Welcome {userProfile?.data().name} <LogOut />
      </div>
    );
}

export default HomePage