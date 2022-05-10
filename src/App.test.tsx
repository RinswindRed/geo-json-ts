import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("should have Loading on mount", () => {
  const { getAllByTestId } = render(<App />);
  const LoadingComponent = getAllByTestId("loading-screen");
  expect(LoadingComponent[0]).toBeInTheDocument();
});

test("should render the title of an application", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/JSON/)).toBeInTheDocument();
  });
});
