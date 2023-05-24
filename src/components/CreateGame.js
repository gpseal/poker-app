import { useState } from "react";
import CreateGameModal from "./CreateGameModal";
import { ButtonStandard } from "./buttons/buttons";

const CreateGame = () => {

    const [modalVisible, setModalVisible] = useState(false)

    return(<div className="py-10 flex justify-center items-center flex-col">
        <CreateGameModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <h1>Create a Game</h1>
        <ButtonStandard onClick={() => setModalVisible(true)} text={"Create New Game"} />
        </div>
        )
}

export default CreateGame