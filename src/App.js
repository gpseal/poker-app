import "./App.css";
import Login from "./components/authentication/Login";
import UserContext from "./components/UserContext";
import { useContext, useEffect } from "react";
import HomePage from "./pages/HomePage";
import { ScreenLoading } from "./components/misc/Loading";
import { Routes, Route } from "react-router-dom";
import Game from "./pages/Game";

function App() {
  const { isAuthenticated, isLoading, currentUser } = useContext(UserContext);

  return (
    <div className="bg-back min-h-screen">
      {isLoading ? (
        <ScreenLoading />
      ) : (
        <div>
          {!currentUser ? (
            <Login />
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game/:id" element={<Game />} />
            </Routes>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
