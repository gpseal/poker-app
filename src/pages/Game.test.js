import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Game from "./Game";
import UserContext from "../components/UserContext";
import { listenForChanges } from "../fireBaseFunctions/dataFunctions";
import { endTurn } from "../fireBaseFunctions/gameFunctions";

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

jest.mock("../firebaseFunctions/gameFunctions", () => ({
  endTurn: jest.fn(),
}));


// jest.mock("../fireBaseFunctions/dataFunctions", () => {
//   return {
//     listenForChanges: (collectionName, callback) => {
//       if (collectionName == 'games/undefined'){
//         callback({gameID: 1, name: "game1", players: 2, status: "waiting"})
//       } else if (collectionName == 'games/undefined/players/undefined') {
//         callback({name: "mark", score: {handName: "pair"}})
//       }
//     }
//   }
// })

// it("displays game information in waiting room", () => {

//   const user = { currentUser: "123" };
//   // eslint-disable-next-line testing-library/no-unnecessary-act
//   act(() => {
//       mockContext(user, <Game />);
//   });

//   expect(container.querySelector("waitForGameToStart")).toBeInTheDocument()
//   expect(container.querySelectorAll("button")[1].textContent).toBe("Begin Game")

//   // eslint-disable-next-line testing-library/no-node-access
//   expect(container.querySelector("h1").textContent).toBe("game1 Waiting Room");
// });

jest.mock("../fireBaseFunctions/dataFunctions", () => {
  return {
    listenForChanges: (collectionName, callback) => {
      if (collectionName == "games/undefined") {
        callback({
          gameID: 1,
          name: "game1",
          players: 2,
          status: "playing",
          player_names: ["mark", "barry"],
        });
      } else if (collectionName == "games/undefined/players/undefined") {
        callback({ name: "mark", score: { handName: "pair" } });
      }
    },
  };
});

it("displays Game Menu correctly", () => {

  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
      mockContext(user, <Game />);
  });

  expect(container.querySelector("button").textContent).toBe("Hold")
  expect(container.querySelector("h1").textContent).toBe("Who's Turn");
  expect(container.querySelectorAll("h2")[0].textContent).toBe("mark");
  expect(container.querySelectorAll("h2")[1].textContent).toBe("barry");

});

it("plays a hand", () => {
  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    mockContext(user, <Game />);
  });

  const holdButton = document.querySelector("button");

  act(() => {
    holdButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(endTurn).toHaveBeenCalledTimes(1);
});