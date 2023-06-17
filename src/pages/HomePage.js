import Login from "../components/authentication/Login";
import LogOut from "../components/authentication/Logout";
import UserContext from "../components/UserContext";
import { useState, useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firestore";
import { getDocument } from "../fireBaseFunctions/dataFunctions";
import CreateGame from "../components/CreateGame";
import JoinGame from "../components/JoinMenu";
import Loading from "../components/Loading";

const HomePage = () => {
  const { currentUser, setCurrentUser, isLoading } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState();
  const docRef = doc(db, "users", currentUser);

  useEffect(() => {
    getDocument(docRef).then((data) => {
      setUserProfile(data);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-main-back bg-center bg-cover flex justify-center w-screen h-screen">
          <div className="w-11/12 lg:w-2/5">
            <h1>POKER 2000</h1>
            <div className="sm:flex">
              <div className="sm:flex sm:bg-red-500 sm:flex-col sm:w-7/12">
                <div className="flex sm:flex-col sm:w-full">
                  <div className="bg-black bg-opacity-70 w-full py-2 mr-1 my-auto backdrop-blur-sm flex justify-center sm:mb-1">
                    <h2>Hi {userProfile?.data().name}</h2>
                  </div>
                  <LogOut />
                </div>
                <CreateGame userName={userProfile?.data().name} />
              </div>
              <JoinGame userName={userProfile?.data().name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
