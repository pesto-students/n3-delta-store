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
import PDPContainer from "../PDPContainer";
import * as mockProducts from "../../mock/products.json";
import * as commerce from "../../main/axios/commerce";
// const store = configureStore({ reducer: { user: userReducer }, preloadedState })
const server = setupServer(
  

  rest.get("https://api.chec.io/v1/products/:id", (req, res, ctx) => {
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

test("should load and display skeleton of pdp page", async () => {
  render(
    <Provider store={mockStore}>
      <PDPContainer />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("pdp-skeleton-container"));
  const element = screen.getByTestId("pdp-skeleton-container");

  expect(element).toBeInTheDocument;
});

test("loads and displays pdp page", async () => {
  jest.spyOn(commerce, 'getProducts').mockResolvedValue({});
  const spyMethod = jest.spyOn(commerce, 'getProducts');

  render(
    <Provider store={mockStore}>
      <PDPContainer />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("pdp-skeleton-container"));
  const element = screen.getByTestId("pdp-skeleton-container");
  await waitFor(() => expect(spyMethod).toHaveBeenCalledTimes(0));
  expect(element).toBeInTheDocument;
});
