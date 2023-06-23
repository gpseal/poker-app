import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import UserContext from "../UserContext";
import RegisterForm from "./RegisterForm";
import { registerUser } from "../../fireBaseFunctions/registrationFunctions";

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

jest.mock("../../fireBaseFunctions/registrationFunctions", () => ({
  registerUser: jest.fn(),
}));

let mockShow = true

it("displays Register Screen and enables user to register and sign in", () => {
  const user = { currentUser: "" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
      mockContext(user, <RegisterForm show={mockShow} />);
  });

  const closeButton = screen.getByText("Close")
  const registerButton = screen.getByText("Register")

  expect(screen.getByTestId("reg-modal")).toBeInTheDocument()
  expect(closeButton).toBeInTheDocument()
  expect(registerButton).toBeInTheDocument()

  fireEvent.click(registerButton);
  expect(registerUser).toHaveBeenCalled()
});
