import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react";
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

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("../fireBaseFunctions/dataFunctions", () => {
  return {
    getDocument: (ref, callBack) => {
      callBack({
        name: "Wendy",
      });
    },
    listenForCollectionChanges: (ref, callBack) => {
      callBack([{
        id: "123456",
        data: {
          name: "game1",
          players: 1,
          owner: "mark123",
          status: "waiting"
        }
      }]);
    }
  };
});

const mockContext = (user, component) => {
  return render(
    <UserContext.Provider value={user}>{component}</UserContext.Provider>,
    container
  );
};

it("renders with or without a name", () => {
  const user = { currentUser: "123" };
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    mockContext(user, <HomePage />);
  });
  

  // const button = screen.getAllByTestId("123456-buttonTitle");

  // eslint-disable-next-line testing-library/no-node-access
  console.log(document.getElementById("123456-buttonTitle").innerHTML);
  expect(screen.getByText("game1")).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.querySelector("h1").textContent).toBe("POKER 2000")

  // expect(screen.getAllByRole("button")[2]).toContain("game1")
  // const button = screen.getByText("POKER 2000");
  // console.log(button)
  // eslint-disable-next-line no-restricted-globals
  // expect(button).toHaveTextContent("POKER");

  // act(() => {
  //   render(<Hello name="Jenny" />, container);
  // });
  // expect(container.textContent).toBe("Hello, Jenny!");

  // act(() => {
  //   render(<Hello name="Margaret" />, container);
  // });
  // expect(container.textContent).toBe("Hello, Margaret!");
});