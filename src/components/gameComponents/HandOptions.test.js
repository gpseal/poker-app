import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { mockContext, mockRouter } from "../TestingFunctions";
import HandOptions from "./HandOptions";
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

let mockActiveCards = [];

it("displays hold options to player when no cards are selected", () => {
  act(() => {
    mockContext(
      user,
      <HandOptions
        activeCards={mockActiveCards}
        gameID={"1234"}
        currentUser={user.currentUser}
      />,
      container
    );
  });

  const holdButton = screen.getByText("Hold");
  expect(holdButton).toBeInTheDocument();
  fireEvent.click(holdButton);
  expect(endTurn).toHaveBeenCalledTimes(1);

  expect(screen.queryByText("Swap Cards")).not.toBeInTheDocument()
});


it("displays hold and swap card options to player when cards are selected", () => {
  mockActiveCards = [0, 1];
  act(() => {
    mockContext(
      user,
      <HandOptions
        activeCards={mockActiveCards}
        gameID={"1234"}
        currentUser={user.currentUser}
      />,
      container
    );
  });

  const holdButton = screen.getByText("Hold");
  expect(holdButton).toBeInTheDocument();
  fireEvent.click(holdButton);
  expect(endTurn).toHaveBeenCalledTimes(1);

  const swapCardsButton = screen.getByText("Swap Cards");
  expect(swapCardsButton).toBeInTheDocument();
  fireEvent.click(swapCardsButton);
  expect(swapCards).toHaveBeenCalledTimes(1);
});