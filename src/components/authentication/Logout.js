import UserContext from '../UserContext';
import { useContext } from 'react';

const Logout = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const logoutUser = () => {
        setCurrentUser(null)
    }

    return(
        <button onClick={logoutUser}>Logout</button>
    )
}

export default Logout