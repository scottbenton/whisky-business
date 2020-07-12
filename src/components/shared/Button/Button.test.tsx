import React from "react";
import { act, render, cleanup, fireEvent } from "@testing-library/react";
import { Button, ButtonProps } from "./Button";

afterEach(cleanup);
describe("Button Tests", () => {
  const setup = (props: ButtonProps) => render(<Button {...props} />);

  test("It renders children", () => {
    const { getByText } = setup({ id: "test", children: "child" });
    expect(getByText(/child/i)).toBeInTheDocument();
  });

  test("It calls onClick functions", () => {
    const onClick = jest.fn();
    const { getByTestId } = setup({ id: "test", onClick: onClick });
    const button = getByTestId("test-button");

    act(() => {
      fireEvent.click(button);
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
