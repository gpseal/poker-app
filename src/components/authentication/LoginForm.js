import { useEffect, useState } from "react";
import UserContext from "../UserContext";
import { useContext } from "react";
import { loginUser } from "../../fireBaseFunctions/registrationFunctions";

const LoginForm = (props) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useContext(UserContext);

  const handleLogin = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    await loginUser(email, password, setCurrentUser)
    setIsLoading(false)
    };

  return (
    <div>
      <h1 className="text-center">Welcome</h1>
      <form className="flex-col flex items-center" onSubmit={handleLogin}>
        <p className="mt-3 text-slate-400">Email</p>
        <input
          className="border"
          type="text"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <p className="mt-3 text-slate-400">Password</p>
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
          type="submit"
          className="p-2 w-20 mt-10 bg-black text-white hover:bg-slate-500"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
