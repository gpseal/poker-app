import { useState } from "react";
import CreateGameModal from "./CreateGameModal";
import { ButtonStandard } from "./buttons/buttons";
import { Link } from "react-router-dom";

const CreateGame = (props) => {

    const [modalVisible, setModalVisible] = useState(false)

    return (
      <div className="flex flex-col items-center w-full bg-black bg-opacity-50 mt-1 py-5">
        <CreateGameModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          userName={props.userName}
        />
        <h1>Create a Game</h1>
        <ButtonStandard
          onClick={() => setModalVisible(true)}
          text={"Create New Game"}
        />
      </div>
    );
}

export default CreateGame