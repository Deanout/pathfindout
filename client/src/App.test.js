import React from "react";
import { getAllByText, getByText, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("renders Pathfindout", () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getAllByText(/Pathfindout/)[0]).toBeInTheDocument();
});
