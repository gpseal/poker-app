import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Game from "./Game";
import UserContext from "../components/UserContext";
import { fireEvent, screen } from "@testing-library/react";
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


// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// https://stackoverflow.com/questions/54292298/jest-mock-react-context
const mockContext = (user, component) => {
  return render(
    <UserContext.Provider value={user}>{component}</UserContext.Provider>,
    container
  );
};

jest.mock("../firebaseFunctions/gameFunctions", () => ({
  endTurn: jest.fn(),
}));

let mockgameStatus = "waiting"

jest.mock("../fireBaseFunctions/dataFunctions", () => {
  return {
    listenForChanges: (collectionName, callback) => {
      if (collectionName == "games/undefined") {
        callback({
          owner: "123",
          gameID: 1,
          name: "game1",
          players: 2,
          status: mockgameStatus,
          player_names: ["mark", "barry"],
        });
      } else if (collectionName == "games/undefined/players/undefined") {
        callback({ name: "mark", score: { handName: "pair" } });
      }
    },
  };
});

it("displays waiting room while status is in 'waiting'", () => {

  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
      mockContext(user, <Game />);
  });

  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByText("game1 Waiting Room")).toBeInTheDocument()
  expect(screen.getByTestId("mark-waiting")).toBeInTheDocument()
  expect(screen.getByTestId("barry-waiting")).toBeInTheDocument()
  expect(screen.getByText("Begin Game")).toBeInTheDocument()
  expect(screen.getByText("exit")).toBeInTheDocument()
});


it("displays Game while status is in 'playing'", () => {
  mockgameStatus = "playing"
  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
      mockContext(user, <Game />);
  });

  expect(screen.getByText("Hold")).toBeInTheDocument()
  expect(screen.getByText("Who's Turn")).toBeInTheDocument();
  expect(screen.getByText("mark")).toBeInTheDocument();
  expect(screen.getByText("barry")).toBeInTheDocument();
});

it("plays a hand", () => {
  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    mockContext(user, <Game />);
  });

  const holdButton = screen.getByText("Hold");

  fireEvent.click(holdButton);
  expect(endTurn).toHaveBeenCalledTimes(1);
});