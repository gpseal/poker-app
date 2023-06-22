import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Login from "./Login";
import { fireEvent, screen } from "@testing-library/react";
import UserContext from "../UserContext";
import { loginUser } from "../../fireBaseFunctions/registrationFunctions";

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

jest.mock("../../fireBaseFunctions/registrationFunctions", () => ({
    loginUser: jest.fn(),
  }));

const mockContext = (user, component) => {
    return render(
      <UserContext.Provider value={user}>{component}</UserContext.Provider>,
      container
    );
  };

it("displays Login Screen and enables user to sign in", () => {
  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
      mockContext(user, <Login />);
  });

  const emailInput = screen.getByPlaceholderText("Email")
  const passwordInput = screen.getByPlaceholderText("Password")
  const submitButton = screen.getByText("Sign In")
  const register = screen.getByText("Register")
  expect(screen.getByText("Welcome")).toBeInTheDocument()
  expect(screen.getByText("Welcome")).toBeInTheDocument()
  expect(screen.getByText("Please Login")).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  
  fireEvent.change(emailInput, { target: { value: "greg@greg.com" } })
  fireEvent.change(passwordInput, { target: { value: "p@ssw0rd" } })
  
  expect(emailInput.value).toBe("greg@greg.com")
  expect(passwordInput.value).toBe("p@ssw0rd")

  fireEvent.click(submitButton);
  expect(loginUser).toHaveBeenCalledTimes(1);
  
  fireEvent.click(register);

});

it("displays Registration Modal when register is clicked", () => {
    const user = { currentUser: "123" };
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
        mockContext(user, <Login />);
    });
  
    const register = screen.getByText("Register")
    fireEvent.click(register);
    expect(screen.getByText("User Name")).toBeInTheDocument()
    expect(screen.getByTestId("reg-modal")).toBeInTheDocument()
  });
