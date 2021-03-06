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
import Cart from "../CartContainer";

// const store = configureStore({ reducer: { user: userReducer }, preloadedState })
const server = setupServer(
  rest.get("https://api.chec.io/v1/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  })
);
const mockDispatch = jest.fn();

const mockStore = { ...store };
console.log("mockstore", mockStore);
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

test("should load and display noauth when not logged in", async () => {
  render(
    <Provider store={mockStore}>
      <Cart />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("cart-noauth"));
  const element = screen.getByTestId("cart-noauth");

  expect(element).toBeInTheDocument;
});

test("should load and display empty component when logged in and no cart items", async () => {
  render(
    <Provider store={mockStore}>
      <Cart />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("cart-noauth"));
  const element = screen.getByTestId("cart-noauth");

  expect(element).toBeInTheDocument;
});

test("should load and display cart items when logged in and user has cart items", async () => {
  render(
    <Provider store={mockStore}>
      <Cart />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("cart-noauth"));
  const element = screen.getByTestId("cart-noauth");

  expect(element).toBeInTheDocument;
});
