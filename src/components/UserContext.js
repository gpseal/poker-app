import { createContext, useState, useEffect } from "react";
import { auth } from './Firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user.uid); // store the UID of the logged-in user in state
            } else {
                setCurrentUser(null); // user logged out
            }
        });
    },[])

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser, isLoading, setIsLoading}}>{children}</UserContext.Provider>
    )
}

export default UserContext;