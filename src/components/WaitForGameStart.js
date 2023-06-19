import { ButtonStandard } from "./buttons/buttons"
import { beginGame, leaveGame } from "../fireBaseFunctions/gameFunctions";
import { useNavigate } from "react-router-dom";

const WaitForGameStart = (props) => {

  const navigate = useNavigate();

  return (
    <div className="z-30 w-screen h-screen bg-waiting-back bg-cover bg-center flex justify-center items-center">
      <div className="md:w-4/5 lg:w-2/5">
        <h1
          data-testid="waitingGameName"
          className="bg-black/70 w-full backdrop-blur-sm text-center"
        >
          {`${props.gameName} \n Waiting Room`}
        </h1>
        <h2 className="bg-black/70 w-full backdrop-blur-sm text-center py-2">
          Players Joined
        </h2>
        <div className="flex [&>*:first-child]:ml-0 flex-wrap sm:flex-nowrap">
          {props.players?.map((name) => (
            <h2 key={name} data-testid={`${name}-waiting`} className="py-4 mt-1 bg-black/70 w-full sm:ml-1 flex justify-center backdrop-blur-sm">
              {name}
            </h2>
          ))}
        </div>
        <div className="w-full flex justify-center mt-5">
          <ButtonStandard
            text={"exit"}
            onClick={async() => await leaveGame(props.user, props.userName, props.gameID, navigate)}
          />
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