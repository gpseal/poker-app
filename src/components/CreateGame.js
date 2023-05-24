import { useState } from "react";
import CreateGameModal from "./CreateGameModal";

const CreateGame = () => {

    const [modalVisible, setModalVisible] = useState(false)

    return(<div className="py-10">
        <CreateGameModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <h1>Create a Game</h1>
        <button onClick={() => setModalVisible(true)}>Create New Game</button>
        </div>
        )
}

export default CreateGame