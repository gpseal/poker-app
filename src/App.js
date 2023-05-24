import './App.css';
import Login from './components/authentication/Login';
import UserContext from './components/UserContext';
import { useContext, useEffect } from 'react';
import HomePage from './pages/home';
import Loading from './components/Loading';
import { Routes, Route } from "react-router-dom";
import Game from './pages/Game';

function App() {
  // const { currentUser } = useContext(UserContext)
  // const { isLoading } = useContext(UserContext);
  const { isAuthenticated, isLoading, currentUser } = useContext(UserContext);
  
  console.log(isAuthenticated);

  return (
    <div className="bg-back min-h-screen">
      {isLoading ? <Loading /> :
      <div>
        {!currentUser ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<Game />} />
          </Routes>
        )}
      </div>}
    </div>
  );
}

export default App;
