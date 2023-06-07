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
        <div className="bg-main-back bg-cover flex justify-center w-screen h-screen">
          <div className="w-2/5">
            <div className="w-full font-['Audiowide'] text-5xl text-pink-500 py-1">
              POKER 2000
            </div>
            <div className="bg-black bg-opacity-70 py-5 w-full backdrop-blur-sm">
              <div className="flex justify-center">
                <h2>Welcome {userProfile?.data().name}</h2>
              </div>
            </div>
            <CreateGame userName={userProfile?.data().name} />
            <JoinGame userName={userProfile?.data().name} />
            <LogOut />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
