import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
// import UserContext from "../components/UserContext";
// import { ButtonStandard, ButtonText, ButtonForm } from "./buttons";
import Game from "./Game";
import UserContext from "../components/UserContext";
import { listenForChanges } from "../fireBaseFunctions/dataFunctions";

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

const mockContext = (user, component) => {
  return render(
    <UserContext.Provider value={user}>{component}</UserContext.Provider>,
    container
  );
};

// jest.mock(listenForChanges, (collectionName, callback) => {
//   if (collectionName == 'games/undefined')
//     callback([
//       {gameID: 1, gameName: "game1", players: 2}
//     ]);
//   else if ('games/undefined/players/123')
//     callback([
//       {id: 1, name: "mark", score: {handName: "pair"}}
//     ]);
// });

jest.mock("../fireBaseFunctions/dataFunctions", () => {
  return {
    listenForChanges: (collectionName, callback) => {
      if (collectionName == 'games/undefined'){
        callback({gameID: 1, gameName: "game1", players: 2, status: "waiting"})
      } else if (collectionName == 'games/undefined/players/undefined') {
        callback({name: "mark", score: {handName: "pair"}})
      }
    }
  }
})

it("displays game information in waiting room", () => {
  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
      mockContext(user, <Game />);
  });

  // console.log(container.querySelector("[data-testid=waitForGameToStart]"))

  // eslint-disable-next-line testing-library/no-node-access
  expect(
    container.querySelector("[data-testid=waitForGameToStart]").textContent
  ).toBe("test");
});
