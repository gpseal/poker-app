import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../Firestore';
import UserContext from '../UserContext';
import { useContext } from 'react';

const Login = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") 

    console.log(currentUser)

    const loginUser = async (e) => {
        e.preventDefault();
        const user = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
        setCurrentUser(user.user.uid)
    }

    return (<>
                <form
                    onSubmit={loginUser}>
                    <label>Email: </label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        value={email}
                    />
                    <label>Password: </label>
                    <input 
                        type="text"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        value={password}
                    />
                    <button id="sign-in" type="subimt">
                        Sign in
                    </button>
                </form>
</>);
}
export default Login