import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { mockContext, mockRouter } from "../TestingFunctions";
import PlayerHand from "./PlayerHand";
import { endTurn } from "../../fireBaseFunctions/gameFunctions";
import { swapCards } from "../cards/cardFunctions";

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
  endTurn: jest.fn(),
}));

jest.mock("../cards/cardFunctions", () => ({
  swapCards: jest.fn(),
}));

const user = { currentUser: "123" };
let mockUserData = {
  cards: [
    {
      card: "4",
      image:
        "https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/spades_4.svg",
      suit: "spades",
      value: 4,
    },
    {
      card: "7",
      image:
        "https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/diamonds_7.svg",
      suit: "diamonds",
      value: 7,
    },
  ],
  name: "tina",
  playerNum: 1,
};

let mockTurnOver = false;
let mockPlayerIDs = ["123", "456"];

it("displays player Cards and allows user to play hand", () => {
  act(() => {
    mockContext(
      user,
      <PlayerHand
        gameID={1}
        currentUser={user.currentUser}
        turn={1}
        players={2}
        playerIDs={mockPlayerIDs}
        turnOver={mockTurnOver}
        userData={mockUserData}
      />,
      container
    );
  });

  const holdButton = screen.getByText("Hold");
  const card1 = screen.getByTestId("4spades-card");
  const card2 = screen.getByTestId("7diamonds-card");

  expect(holdButton).toBeInTheDocument();
  expect(card1).toBeInTheDocument();
  expect(card2).toBeInTheDocument();

  fireEvent.click(holdButton);
  expect(endTurn).toHaveBeenCalledTimes(1);

  fireEvent.click(card1);
  const swapCardsButton = screen.getByText("Swap Cards");
  expect(swapCardsButton).toBeInTheDocument();
  fireEvent.click(swapCardsButton);
  expect(swapCards).toHaveBeenCalledTimes(1);
});

it("displays player Cards but does not allow player to play hand", () => {
  act(() => {
    mockContext(
      user,
      <PlayerHand
        gameID={1}
        currentUser={user.currentUser}
        turn={2}
        players={2}
        playerIDs={mockPlayerIDs}
        turnOver={mockTurnOver}
        userData={mockUserData}
      />,
      container
    );
  });

  const card1 = screen.getByTestId("4spades-card");
  const card2 = screen.getByTestId("7diamonds-card");

  expect(screen.queryByText("Hold")).not.toBeInTheDocument();
  expect(card1).toBeInTheDocument();
  expect(card2).toBeInTheDocument();
  expect(screen.getByText("Wait Your Turn")).toBeInTheDocument();

  fireEvent.click(card1);

  expect(screen.queryByText("Swap Cards")).not.toBeInTheDocument();
});
