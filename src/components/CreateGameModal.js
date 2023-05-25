import { useState, useContext } from "react"
import { shuffle } from "../cards/cardFunctions"
import deck from "../cards/deck"
import UserContext from "../components/UserContext";
import { createGame, joinGame } from "../fireBaseFunctions/gameFunctions";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateGameModal = ( props ) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [gameName, setGameName] = useState("")

    const generateRandomString = () => {
      return Math.floor((Math.random()*10) * Date.now()).toString(36);
    };
    // console.log(generateRandomString());

    const gameID = generateRandomString();

    const prepAndStart = async(e) => {
        e.preventDefault();
        shuffle(deck)
        await createGame(currentUser, deck, gameName, gameID);
        await joinGame(currentUser, gameID);
        navigate(`/game/${gameID}`);
    }

    return (
      <>
        {props.modalVisible && (
          <div className="w-screen h-screen bg-white/30 z-20 absolute top-0 left-0 right-0 flex-col flex items-center justify-center backdrop-blur-md">
            <div className="bg-white py-5 px-20 flex-col flex items-center justify-center shadow-lg">
              <p className="pb-5">Enter Game Name</p>
              <form
                className="flex items-center flex-col"
                onSubmit={prepAndStart}
              >
                <input
                  className="border"
                  type="text"
                  id="gameName"
                  name="gameNAme"
                  onChange={(e) => setGameName(e.target.value)}
                  placeholder="Game Name"
                  value={gameName}
                />
                <div>
                    <button
                      id="create-game"
                      type="subimt"
                      className="p-2 w-20 mt-10 bg-button text-white hover:bg-button-h"
                    >
                      Create
                    </button>
                  <button
                    id="create-game"
                    className="p-2 w-20 mt-10 ml-2 bg-button text-white hover:bg-button-h"
                    onClick={() => props.setModalVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
}

export default CreateGameModal