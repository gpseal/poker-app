import './App.css';
import Login from './components/authentication/Login';
import UserContext from './components/UserContext';
import { useContext, useEffect } from 'react';
import Logout from './components/authentication/Logout';
import SignOut from './components/authentication/SignOut';
import HomePage from './pages/home';
import Loading from './components/Loading';

function App() {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const { isLoading, setIsLoading } = useContext(UserContext);

  console.log(isLoading);

  return (<>
      {!currentUser ? <Login /> : <HomePage />}
    </>);
}

export default App;
