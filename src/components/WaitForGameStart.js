import { ButtonStandard } from "./buttons/buttons"
import { beginGame } from "../fireBaseFunctions/gameFunctions"

const WaitForGameStart = (props) => {
    return (
      <div className="z-30 absolute w-screen h-screen bg-green-100">
        <h1>Waiting Room</h1>
        <h2>Players Joined</h2>
        {props.players?.map((name) => (
          <div>{name}</div>
        ))}
        <ButtonStandard text={"Exit"} />
        {props.owner === props.user && props.players.length > 1 && (
          <ButtonStandard
            text={"Begin Game"}
            onClick={() => beginGame(props.gameID)}
          />
        )}
      </div>
    );
}

export default WaitForGameStart