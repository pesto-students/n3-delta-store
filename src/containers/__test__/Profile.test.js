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
import Profile from "../ProfileContainer";

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

test("should load and display main conitainer for profile page", async () => {
  render(
    <Provider store={mockStore}>
      <Profile />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("profile-main-container"));
  const element = screen.getByTestId("profile-main-container");

  expect(element).toBeInTheDocument;
});

test("loads and displays account profile holder", async () => {
  render(
    <Provider store={mockStore}>
      <Profile />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("profile-component-holder"));
  const element = screen.getByTestId("profile-component-holder");

  expect(element).toBeInTheDocument;
});

test("loads and renders AccountProfileDetails child component holder", async () => {
  render(
    <Provider store={mockStore}>
      <Profile />
    </Provider>
  );

  await waitFor(() => screen.getByTestId("profile-details-component-holder"));
  const element = screen.getByTestId("profile-details-component-holder");

  expect(element).toBeInTheDocument;
});
