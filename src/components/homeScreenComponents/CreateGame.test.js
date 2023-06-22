import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import CreateGame from "./CreateGame";
import UserContext from "../UserContext";
import { fireEvent, screen } from "@testing-library/react";


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

const mockContext = (user, component) => {
  return render(
    <UserContext.Provider value={user}>{component}</UserContext.Provider>,
    container
  );
};

it("displays create game options when 'Create a Game' button is clicked", () => {
    const user = { currentUser: "123" };
    

// eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
        mockContext(user, <CreateGame userName={"Mark"} />);
    })

    expect(container.querySelector("button").textContent).toBe("Create a Game");
    expect(container.querySelector("[data-testid=CreateButton]")).toBeNull();

    const showModalButton = container.querySelector("button");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
        showModalButton.dispatchEvent(
          new MouseEvent("click", { bubbles: true })
        );
    })

    expect(
      container.querySelector("[data-testid=CreateButton]").textContent
    ).toBe("Create");

    expect(screen.getByTestId("CreateButton")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Game Name")).toBeInTheDocument();

});