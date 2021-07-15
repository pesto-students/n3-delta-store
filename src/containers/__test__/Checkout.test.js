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
import Checkout from "../CheckoutContainer";

// const store = configureStore({ reducer: { user: userReducer }, preloadedState })
const server = setupServer(
  rest.get("/greeting", (req, res, ctx) => {
    return res(ctx.json({ greeting: "hello there" }));
  }),

  rest.get("https://api.chec.io/v1/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  })
);
const mockDispatch = jest.fn();
const mockSelector = jest.fn();

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

test("should load and display noauth when not logged in", async () => {
  render(
    <Provider store={mockStore}>
      <Checkout />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("checkout-noauth-container"));
  const element = screen.getByTestId("checkout-noauth-container");

  expect(element).toBeInTheDocument;
});

test("should load and display empty component when logged in and no cart items", async () => {
  render(
    <Provider store={mockStore}>
      <Checkout />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("checkout-empty-container"));
  const element = screen.getByTestId("checkout-empty-container");

  expect(element).toBeInTheDocument;
});

test("should load and display cart items when logged in and user has cart items", async () => {
    render(
      <Provider store={mockStore}>
        <Checkout />
      </Provider>
    );
  
    await waitFor(() => screen.getByTestId("checkout-data-container"));
    const element = screen.getByTestId("checkout-data-container");
  
    expect(element).toBeInTheDocument;
  });
