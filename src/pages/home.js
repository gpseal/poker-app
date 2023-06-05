import Login from "../components/authentication/Login"
import LogOut from "../components/authentication/Logout";
import UserContext from "../components/UserContext";
import { useState, useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDocument } from "../fireBaseFunctions/dataFunctions";
import CreateGame from "../components/CreateGame";
import JoinGame from "../components/JoinGame";
import Loading from "../components/Loading";

const HomePage = () => {

    const { currentUser, setCurrentUser, isLoading } = useContext(UserContext);
    const [userProfile, setUserProfile] = useState()
    const docRef = doc(db, "users", currentUser)
    
    useEffect(() => {
        getDocument(docRef).then(data => {
                setUserProfile(data)
            })
    },[])

    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-main-back h-screen">
            <div className="flex justify-center w-screen bg-blue-500 h-screen bg-opacity-90">
              <div className="flex flex-col content-center items-center pt-3 w-2/5 backdrop-blur-md">
                <div className="bg-black bg-opacity-50 py-5 w-full">
                  <div className="flex justify-center">
                    <h2>Welcome {userProfile?.data().name}</h2>
                  </div>
                </div>
                <CreateGame userName={userProfile?.data().name} />
                <JoinGame userName={userProfile?.data().name} />
                <LogOut />
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default HomePage