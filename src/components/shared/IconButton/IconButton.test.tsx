import React from "react";
import {
  render,
  act,
  fireEvent,
  cleanup,
  getByTestId,
} from "@testing-library/react";
import { IconButton, IconButtonProps } from "./IconButton";

afterEach(cleanup);
describe("IconButton tests", () => {
  const setup = (props: IconButtonProps) => {
    return render(<IconButton {...props} />);
  };

  test("It renders passed icon", () => {
    const { getByTestId } = setup({ id: "test", icon: "span" });
    expect(getByTestId("icon")).toBeInTheDocument();
  });

  test("It uses a passed id as a testId", () => {
    const { getByTestId } = setup({ id: "test", icon: "bones" });
    expect(getByTestId("test-button")).toBeInTheDocument();
  });
});
