import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
// import UserContext from "../components/UserContext";
import { ButtonStandard, ButtonText, ButtonForm } from "./buttons";
import { listenForChanges } from "../fireBaseFunctions/dataFunctions";
import WaitForGameStart from "./WaitForGameStart";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


jest.mock(listenForChanges, (collectionName, callback) => {
    callback([
      { gameID: 1, gameName: "Gregs Game", owner: 12345, user: 12345, players: ["mark", "Roger"]},
    ]);
});

it("displays text on standard button & calls function when clicked", () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    const gameData = listenForChanges;
    const gameID = 123
    render(
      <WaitForGameStart
        gameName={gameData?.name}
        owner={gameData?.owner}
        user={"currentUser"}
        players={gameData?.player_names}
        gameID={gameID}
      />,
      container
    );
  });

  console.log(container)

  // eslint-disable-next-line testing-library/no-node-access
//   const button = document.querySelector("[data-testid=stdButton]");

//   act(() => {
//     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//   });

//   expect(mockedButtonFunction).toHaveBeenCalledTimes(1);
//   expect(button.innerHTML).toBe("Press Me");
});
