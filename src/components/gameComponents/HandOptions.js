import { ButtonStandard } from "../buttons/buttons";
import { swapCards } from "../cards/cardFunctions";
import { endTurn } from "../../fireBaseFunctions/gameFunctions";

const HandOptions = (props) => {
  if (props) {
    return (
      <>
        {props?.activeCards?.length !== 0 && (
          <ButtonStandard
            onClick={() =>
              swapCards(
                props?.gameID,
                props?.activeCards,
                props?.userCards,
                props?.currentUser
              )
            }
            text={"Swap Cards"}
          />
        )}
        <ButtonStandard
          onClick={() =>
            endTurn(props?.gameID, props?.userCards, props?.currentUser)
          }
          text={"Hold"}
        />
      </>
    );
  }
};

export default HandOptions;
