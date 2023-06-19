import Login from "../components/authentication/Login";
import LogOut from "../components/authentication/Logout";
import UserContext from "../components/UserContext";
import { useState, useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDocument } from "../fireBaseFunctions/dataFunctions";
import CreateGame from "../components/CreateGame";
import JoinGame from "../components/JoinMenu";
import { ScreenLoading } from "../components/misc/Loading";

const HomePage = () => {
  const { currentUser, setCurrentUser, isLoading } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState();
  const docRef = doc(db, "users", currentUser);

  useEffect(() => {
    getDocument(docRef, setUserProfile)
  }, []);

  return (
    <>
      {!userProfile ? (
        <ScreenLoading />
      ) : (
        <div className="bg-main-back bg-top bg-cover flex justify-center w-screen h-screen">
          <div className="w-11/12 lg:w-2/5">
            <h1>POKER 2000</h1>
            <div className="sm:flex lg:inline">
              <div className="sm:flex sm:flex-col sm:w-7/12 lg:w-full">
                <div className="flex sm:flex-col sm:w-full lg:flex-row">
                  <div className="bg-black bg-opacity-70 w-full py-2 mr-1 my-auto backdrop-blur-md flex justify-center sm:mb-1 lg:mb-0">
                    <h2>Hi {userProfile.name}</h2>
                  </div>
                  <LogOut />
                </div>
                <CreateGame userName={userProfile.name} />
              </div>
              <JoinGame userName={userProfile.name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
