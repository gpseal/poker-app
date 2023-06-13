import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
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


jest.mock("../fireBaseFunctions/dataFunctions", () => {
  return {
    listenForChanges: (collectionName, callback) => {
      if (collectionName == 'games/undefined'){
        callback({gameID: 1, name: "game1", players: 2, status: "waiting"})
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

  expect(container.querySelector("waitForGameToStart")).toBeInTheDocument
  expect(container.querySelectorAll("button")[1].textContent).toBe("Begin Game")

  // eslint-disable-next-line testing-library/no-node-access
  expect(container.querySelector("h1").textContent).toBe("game1 Waiting Room");
});