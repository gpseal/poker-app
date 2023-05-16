import './App.css';
import Login from './components/authentication/Login';
import UserContext from './components/UserContext';
import { useContext } from 'react';
import Logout from './components/authentication/Logout';
import SignOut from './components/authentication/SignOut';

function App() {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  console.log(currentUser)

  return (<>
      {!currentUser ? <Login /> : <div>Welcome <Logout /></div>}
    </>);
}

export default App;
