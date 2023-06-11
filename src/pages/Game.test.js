import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
// import UserContext from "../components/UserContext";
import { ButtonStandard, ButtonText, ButtonForm } from "./buttons";
import { listenForChanges } from "../fireBaseFunctions/dataFunctions";

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

jest.mock(listenForChanges, (collectionName, callback) => {

});
