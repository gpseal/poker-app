import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react";
import ResultHand from "./ResultHand";
import { winningHand } from "../TestingFunctions";

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

it("displays all cards in hand to user", () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    render(<ResultHand cards={winningHand} />, container);
  });

  expect(screen.getByAltText("9clubs")).toBeInTheDocument();
  expect(screen.getByAltText("10diamonds")).toBeInTheDocument();

});

