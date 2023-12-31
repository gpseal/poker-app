import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { ButtonText } from "../buttons/buttons";
import { ScreenLoading } from "../misc/Loading";

const Login = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const { currentUser, setCurrentUser, isLoading } = useContext(UserContext);

  const handleClick = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <>
      {isLoading ? (
        <ScreenLoading />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center relative flex-col">
          <LoginForm />
          <div className="flex mt-5">
            <p className="mr-3 text-white">Don't have an account? </p>
            <ButtonText text="Register" onClick={handleClick} />
          </div>
          <RegisterForm show={showRegistration} setShow={setShowRegistration} />
        </div>
      )}
    </>
  );
};

export default Login;
