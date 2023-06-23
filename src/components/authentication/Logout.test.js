import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import UserContext from "../UserContext";
import { signOut } from "firebase/auth";
import LogOut from "./Logout";

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

jest.mock("firebase/auth", () => ({
    signOut: jest.fn(),
    getAuth: jest.fn()
  }));
  

const mockContext = (user, component) => {
    return render(
      <UserContext.Provider value={user}>{component}</UserContext.Provider>,
      container
    );
  };

it("displays Logout button", () => {
    const user = { currentUser: "123" };
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
        render(<LogOut />, container);
    });
  
    const logOutButton = screen.getByText("Sign Out")
    expect(logOutButton).toBeInTheDocument()
    fireEvent.click(logOutButton);
    expect(signOut).toHaveBeenCalled();
  });
