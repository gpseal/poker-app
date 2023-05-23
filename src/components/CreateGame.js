import { createGame } from "../fireBaseFunctions/dataFunctions"
import deck from "../cards/deck"
import UserContext from "../components/UserContext";
import { useState, useContext, useEffect } from "react";
import { shuffle } from "../cards/cardFunctions"
import Card from 'react-playing-card'

const CreateGame = () => {
    const { currentUser } = useContext(UserContext);

    const prepAndStart = () => {
        shuffle(deck)
        createGame(currentUser, deck)
    }

    return(<div className="py-10">
        <div className="bg-blue-500">Create a Game</div>
        <button onClick={prepAndStart}>Create New Game</button>
        </div>
        )
}

export default CreateGame