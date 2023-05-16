import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState, useContext } from "react";
import UserContext from '../UserContext';

const Login = () => {

    const [showRegistration, setShowRegistration] = useState(false)
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const handleClick = () => {
        setShowRegistration(!showRegistration)
    }

    return(
    <div className="w-screen h-screen flex justify-center items-center relative flex-col">
        <LoginForm />
        <div className="flex mt-5">
            <p className="mr-3">Don't have an account?  </p>
            <button className="text-blue-600 hover:text-red-600" onClick={handleClick}>Register</button>
        </div>
        <RegisterForm show={showRegistration} setShow={setShowRegistration}/>
    </div>
    )
}

export default Login