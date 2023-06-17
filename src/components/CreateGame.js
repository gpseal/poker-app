import { useState } from "react";
import CreateGameModal from "./CreateGameModal";
import { ButtonStandard } from "./buttons/buttons";
import { Link } from "react-router-dom";

const CreateGame = (props) => {

    const [modalVisible, setModalVisible] = useState(false)

    return (
      <div className="flex flex-col mt-1 w-full">
        <button
          onClick={() => setModalVisible(!modalVisible)}
          className="flex justify-center items-center w-full bg-black bg-opacity-70 py-2 backdrop-blur-sm hover:bg-black"
        >
          <h2>Create a Game</h2>
        </button>
        <CreateGameModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          userName={props.userName}
        />
      </div>
    );
}

export default CreateGame