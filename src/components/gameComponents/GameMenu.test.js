import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import GameMenu from "./GameMenu";

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

let mockTurn = 1
let mockScore = null

it("displays game menu with players / score and indicates turn", () => {
  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    render(
        <GameMenu
          players={["mark", "barry"]}
          turn={1}
          score={null}
        />,
        container
    );
  });
  
  const player1 = screen.getByText("mark");
  const player2 = screen.getByText("barry");
  
  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByText("Who's Turn")).toBeInTheDocument();
  expect(player1).toBeInTheDocument();
  expect(player2).toBeInTheDocument();
  expect(player1).toHaveStyle("background-color: rgb(168 85 247)");
  expect(player2).toHaveStyle("background-color: rgb(0 0 0)");
  
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    render(
          <GameMenu
          players={["mark", "barry"]}
          turn={2}
          score={"pair"}
          />,
          container
        );
    });

  expect(screen.getByText("pair")).toBeInTheDocument();
  expect(player2).toHaveStyle("background-color: rgb(168 85 247)");
  expect(player1).toHaveStyle("background-color: rgb(0 0 0)");
});
