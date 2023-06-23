import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import UserContext from "../components/UserContext";
import HomePage from "./HomePage";
import { joinGame } from "../fireBaseFunctions/gameFunctions";

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

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("../components/cards/cardFunctions", () => ({
  shuffle: jest.fn()
}));

jest.mock("../fireBaseFunctions/gameFunctions", () => ({
  joinGame: jest.fn(),
}));

jest.mock("../fireBaseFunctions/dataFunctions", () => {
  return {
    getDocument: (ref, callBack) => {
      callBack({
        name: "Wendy",
      });
    },
    listenForCollectionChanges: (ref, callBack) => {
      callBack([{
        id: "123456",
        data: {
          name: "game1",
          players: 1,
          owner: "mark123",
          status: "waiting",
          current_players: ["todd"]
        }
      }]);
    }
  };
});

const mockContext = (user, component) => {
  return render(
    <UserContext.Provider value={user}>{component}</UserContext.Provider>,
    container
  );
};

it("renders Home Page user details and game Details", () => {
  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    mockContext(user, <HomePage />);
  });
  
  const gameButton = screen.getByText("game1")
  expect(gameButton).toBeInTheDocument()
  expect(screen.getByText("Hi Wendy")).toBeInTheDocument()
  expect(screen.getByText("POKER 2000")).toBeInTheDocument();
  expect(screen.getByText("players: 1")).toBeInTheDocument();

  fireEvent.click(gameButton)
  expect(joinGame).toHaveBeenCalled();
});

it("Shows create a game modal", () => {
  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    mockContext(user, <HomePage />);
  });

  const createGameButton = screen.getByText("Create a Game");

  fireEvent.click(createGameButton);
  expect(screen.getByPlaceholderText("Game Name")).toBeInTheDocument();
});