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

    const gameID = generateRandomString();

    const prepAndStart = async(e) => {
        e.preventDefault();
        shuffle(deck)
        await createGame(currentUser, deck, gameName, gameID);
        await joinGame(currentUser, props.userName, gameID);
        navigate(`/game/${gameID}`);
    }

    return (
      <>
        {props.modalVisible && (
          <div className="w-full bg-black/70 z-20 flex-col flex items-center justify-center backdrop-blur-sm">
            <div className="px-20 flex-col flex items-center justify-center shadow-lg">
              <form
                className="flex items-center flex-col pb-3"
                onSubmit={prepAndStart}
              >
                <input
                  className="border"
                  type="text"
                  id="gameName"
                  name="gameNAme"
                  maxlength="10"
                  onChange={(e) => setGameName(e.target.value)}
                  placeholder="Game Name"
                  value={gameName}
                />
                <div>
                  <button
                    data-testid="CreateButton"
                    id="create-game"
                    type="subimt"
                    className="p-2 w-20 mt-2 bg-button text-white hover:bg-button-h border border-black hover:border-white"
                  >
                    Create
                  </button>
                  <button
                    id="cancel-game"
                    className="p-2 w-20 mt-5 ml-5 bg-button text-white hover:bg-button-h border border-black hover:border-white"
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