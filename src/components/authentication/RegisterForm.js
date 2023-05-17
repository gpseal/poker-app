import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firestore";
import UserContext from "../UserContext";
// import { registerUser, test } from "./firebaseRegistrationFunctions";
import {
  db,
  registerUser,
} from "../../fireBaseFunctions/registrationFunctions";

const RegisterForm = (props) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const { show } = props;
  const { setShow } = props;

  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const closeRegistration = () => {
    setShow(!show);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    registerUser(email, password, userName, setCurrentUser);
  };

  return (
    <>
      {show ? (
        <div className="bg-white w-screen h-screen z-10 absolute left-0 top-0 flex-col flex items-center justify-center ">
          <div className="p-20 border shadow-lg">
            <form
              className="flex items-center flex-col"
              onSubmit={handleRegistration}
            >
              <p>User Name</p>
              <input
                className="border"
                type="text"
                id="userName"
                name="userName"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
                value={userName}
              />
              <p className="mt-3">Email</p>
              <input
                className="border"
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
              />
              <p className="mt-3">Password</p>
              <input
                className="border"
                type="text"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                value={password}
              />
              <button
                id="sign-in"
                type="subimt"
                className="p-2 w-20 mt-10 bg-black text-white hover:bg-slate-500"
              >
                Register
              </button>
            </form>
          </div>
          <button className="mt-3" onClick={closeRegistration}>
            Close
          </button>
        </div>
      ) : null}
    </>
  );
};

export default RegisterForm;
