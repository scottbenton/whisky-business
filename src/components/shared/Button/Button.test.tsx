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

  test("It changes the background and text colors when the primary variant is passed", () => {
    const { getByTestId } = setup({ id: "test", variant: "primary" });
    const button = getByTestId("test-button");
    expect(button).toHaveClass("bg-green-300");
    expect(button).toHaveClass("text-green-900");
  });

  test("It changes the outline and text colors when the secondary variant is passed", () => {
    const { getByTestId } = setup({ id: "test", variant: "secondary" });
    const button = getByTestId("test-button");
    expect(button).toHaveClass("text-green-700");
    expect(button).toHaveClass("border-green-500");
  });
});
