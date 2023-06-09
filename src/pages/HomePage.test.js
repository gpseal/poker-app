import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import UserContext from "../components/UserContext";
import HomePage from "./HomePage";

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

it("renders with or without a name", () => {
  const user = { currentUser: "123" };
  act(() => {
    mockContext(user, <HomePage />);
  });
  expect(screen).toHaveTextContent("Welcome");

  // act(() => {
  //   render(<Hello name="Jenny" />, container);
  // });
  // expect(container.textContent).toBe("Hello, Jenny!");

  // act(() => {
  //   render(<Hello name="Margaret" />, container);
  // });
  // expect(container.textContent).toBe("Hello, Margaret!");
});