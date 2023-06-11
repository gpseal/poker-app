import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { ButtonStandard, ButtonText, ButtonForm } from "./buttons";

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

const mockedButtonFunction = jest.fn();

it("displays text on standard button & calls function when clicked", () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
      render(<ButtonStandard text={"Press Me"} onClick={mockedButtonFunction} />, container)
  });

  // eslint-disable-next-line testing-library/no-node-access
  const button = document.querySelector("[data-testid=stdButton]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  })

  expect(mockedButtonFunction).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Press Me");
});

it("displays text on text Button & calls function when clicked", () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    render(
      <ButtonText text={"Press Me"} onClick={mockedButtonFunction} />,
      container
    );
  });

  // eslint-disable-next-line testing-library/no-node-access
  const button = document.querySelector("[data-testid=ButtonText]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(mockedButtonFunction).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Press Me");
});

it("displays text on form Button", () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    render(
      <ButtonForm text={"Press Me"} />,
      container
    );
  });

  // eslint-disable-next-line testing-library/no-node-access
  const button = document.querySelector("[data-testid=ButtonForm]");

  expect(button.innerHTML).toBe("Press Me");
});
