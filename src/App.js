import './App.css';
import Login from './components/authentication/Login';
import UserContext from './components/UserContext';
import { useContext, useEffect } from 'react';
import HomePage from './pages/home';
import Loading from './components/Loading';

function App() {
  const { currentUser } = useContext(UserContext)
  const { isLoading } = useContext(UserContext);

  return (<>
      {isLoading && <Loading />}
      <div>{!currentUser ? <Login /> : <HomePage />}</div>
    </>);
}

export default App;
