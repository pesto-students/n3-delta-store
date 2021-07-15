import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../main/store/store";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom/extend-expect";
import * as mockProducts from "../../mock/products.json";
import Home from "../HomeContainer";

// const store = configureStore({ reducer: { user: userReducer }, preloadedState })
const server = setupServer(
  

  rest.get("https://api.chec.io/v1/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  })
);
const mockDispatch = jest.fn();


const mockStore = { ...store };

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);
jest.useFakeTimers();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "prod_12345",
  }),
  useDispatch: () => mockDispatch,
  useSelector: () => (selector) => selector(mockStore),
}));

test("should load and display different categories in Home page", async () => {
  render(
    <Provider store={mockStore}>
      <Home />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("home-categories-container"));
  const element = screen.getByTestId("home-categories-container");

  expect(element).toBeInTheDocument;
});

test("loads and displays home page main container", async () => {
  render(
    <Provider store={mockStore}>
      <Home />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("home-main-container"));
  const element = screen.getByTestId("home-main-container");

  expect(element).toBeInTheDocument;
});

test("loads and displays home page carousel", async () => {
  render(
    <Provider store={mockStore}>
      <Home />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("home-carousel"));
  const element = screen.getByTestId("home-carousel");

  expect(element).toBeInTheDocument;
});
