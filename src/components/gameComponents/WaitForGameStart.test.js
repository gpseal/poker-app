import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import WaitForGameStart from "./WaitForGameStart";
import { mockContext, mockRouter } from "../TestingFunctions";
import { beginGame, leaveGame } from "../../fireBaseFunctions/gameFunctions";

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

jest.mock("../../fireBaseFunctions/gameFunctions", () => ({
  beginGame: jest.fn(),
  leaveGame: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));
// mockRouter();

const user = { currentUser: "123" };
let mockPlayers = ["greg", "mark"]

it("displays waiting room to owner and allows option to begin game", () => {

  act(() => {
    mockContext(user, <WaitForGameStart
      gameName={"game1"}
      owner={"123"}
      user={user.currentUser}
      players={mockPlayers}
      gameID={"9876"}/>,
      container
    );
  });

  const beginButton = screen.getByText("Begin Game");
  // const exitButton = screen.queryByText("exit");

  expect(screen.getByText("game1 Waiting Room")).toBeInTheDocument()
  expect(screen.getByTestId("mark-waiting")).toBeInTheDocument()
  expect(screen.getByTestId("greg-waiting")).toBeInTheDocument()
  expect(beginButton).toBeInTheDocument()
  expect(screen.queryByText("exit")).not.toBeInTheDocument()
  
  fireEvent.click(beginButton)
  expect(beginGame).toHaveBeenCalledTimes(1);
  
  // fireEvent.click(exitButton)
  // expect(leaveGame).toHaveBeenCalledTimes(1);
});

it("displays waiting room to non-owner and allows option to exit game", () => {
  act(() => {
    mockContext(
      user,
      <WaitForGameStart
        gameName={"game1"}
        owner={"456"}
        user={user.currentUser}
        players={mockPlayers}
        gameID={"9876"}
      />,
      container
    );
  });

  const exitButton = screen.queryByText("exit");

  expect(screen.getByText("game1 Waiting Room")).toBeInTheDocument();
  expect(screen.getByTestId("mark-waiting")).toBeInTheDocument();
  expect(screen.getByTestId("greg-waiting")).toBeInTheDocument();
  expect(exitButton).toBeInTheDocument();
  expect(screen.queryByText("Begin Game")).not.toBeInTheDocument();

  fireEvent.click(exitButton)
  expect(leaveGame).toHaveBeenCalledTimes(1);
});

