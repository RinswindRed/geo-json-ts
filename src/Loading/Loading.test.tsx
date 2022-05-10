import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

test("renders a message", () => {
  const { getByTestId } = render(<Loading />);
  const LoadingComponent = getByTestId("loading-screen");
  expect(LoadingComponent).toBeInTheDocument();
  expect(LoadingComponent).toMatchInlineSnapshot(`
<div
  class="Loader-container"
  data-testid="loading-screen"
>
  <div
    id="loader"
  />
</div>
`);
});
