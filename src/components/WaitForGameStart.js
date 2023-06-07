import { ButtonStandard } from "./buttons/buttons"
import { beginGame } from "../fireBaseFunctions/gameFunctions"

const WaitForGameStart = (props) => {
    return (
      <div className="z-30 w-screen h-screen bg-waiting-back bg-cover flex justify-center items-center">
        <div className="w-2/5">
          <h1 className="bg-black/70 w-full backdrop-blur-sm text-center">{props.gameName} Waiting Room</h1>
          <h2 className="bg-black/70 w-full backdrop-blur-sm text-center py-2">Players Joined</h2>
          <div className="flex [&>*:first-child]:ml-0">
            {props.players?.map((name) => (
              <h2 className="py-4 my-1 bg-black/70 w-full ml-1 flex justify-center backdrop-blur-sm">{name}</h2>
            ))}
          </div>
          <div className="w-full flex justify-center mt-5">
            <ButtonStandard text={"Exit"} />
            {props.owner === props.user && props.players.length > 1 && (
              <ButtonStandard
                text={"Begin Game"}
                onClick={() => beginGame(props.gameID)}
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default WaitForGameStart