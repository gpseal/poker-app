import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { mockContext, winningHand, yourHand } from "../TestingFunctions";
import GameResult from "./GameResult";
import { leaveGame, dealAgain } from "../../fireBaseFunctions/gameFunctions";

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

jest.mock("../../fireBaseFunctions/gameFunctions", () => ({
  leaveGame: jest.fn(),
  dealAgain: jest.fn(),
}));

const user = { currentUser: "123" };
let mockWinner = true;

it("displays results to looser with options to leave or deal again", () => {
  act(() => {
    mockContext(
      user,
      <GameResult
        winner={false}
        yourHand={yourHand}
        winningHand={winningHand}
        winningName={"Kenny"}
        user={user.currentUser}
        gameID={"1234"}
        numOfPlayers={2}
        playersRestarting={0}
        userName={"Samantha"}
      />,
      container
    );
  });

  expect(screen.getByText("You Lost, Looser")).toBeInTheDocument()
  expect(screen.getByText("Kenny had the Winning Hand:")).toBeInTheDocument();
  expect(screen.getByAltText("9clubs")).toBeInTheDocument();

  const exitButton = screen.getByText("exit");
  expect(exitButton).toBeInTheDocument();
  fireEvent.click(exitButton);
  expect(leaveGame).toHaveBeenCalledTimes(1);

  const dealAgainButton = screen.getByText("Deal again");
  expect(dealAgainButton).toBeInTheDocument();
  fireEvent.click(dealAgainButton);
  expect(dealAgain).toHaveBeenCalledTimes(1);
});

it("displays results to winner with options to leave or deal again", () => {
    mockWinner=true;
  act(() => {
    mockContext(
      user,
      <GameResult
        winner={true}
        yourHand={winningHand}
        winningHand={winningHand}
        winningName={"Kenny"}
        user={user.currentUser}
        gameID={"1234"}
        numOfPlayers={2}
        playersRestarting={0}
        userName={"Kenny"}
      />,
      container
    );
  });

  expect(screen.getByText("You're a Winner!")).toBeInTheDocument();
  expect(screen.queryByText("Kenny had the Winning Hand:")).not.toBeInTheDocument();
  expect(screen.getByAltText("9clubs")).toBeInTheDocument();

  const exitButton = screen.getByText("exit");
  expect(exitButton).toBeInTheDocument();
  fireEvent.click(exitButton);
  expect(leaveGame).toHaveBeenCalledTimes(1);

  const dealAgainButton = screen.getByText("Deal again");
  expect(dealAgainButton).toBeInTheDocument();
  fireEvent.click(dealAgainButton);
  expect(dealAgain).toHaveBeenCalledTimes(1);
});
