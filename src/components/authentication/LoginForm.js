import { useEffect, useState } from "react";
import UserContext from "../UserContext";
import { useContext } from "react";
import { loginUser } from "../../fireBaseFunctions/registrationFunctions";
import { ButtonForm } from "../buttons/buttons";


const LoginForm = (props) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useContext(UserContext);
  // const { setIsAuthenticated } = useContext(UserContext);

  const handleLogin = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    await loginUser(email, password, setCurrentUser)
    // setIsAuthenticated(true)
    setIsLoading(false)
    };

  return (
    <div>
      <h1 className="text-center">Welcome</h1>
      <h2 className="text-center">Please Login</h2>
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
          className="border mb-5"
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
        />
        <ButtonForm id={"sign-in"} text={"Sign In"} />
      </form>
    </div>
  );
};
export default LoginForm;
