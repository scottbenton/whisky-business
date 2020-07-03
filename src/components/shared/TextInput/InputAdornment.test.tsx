import React from "react";
import { act, render, cleanup, fireEvent } from "@testing-library/react";
import { InputAdornment, InputAdornmentProps } from "./InputAdornment";

afterEach(cleanup);
describe("Input Adornment tests", () => {
  const setup = (props: InputAdornmentProps) => {
    return render(<InputAdornment {...props} />);
  };

  test("It renders children that are passed", () => {
    const { getByText } = setup({ id: "test", children: "testChild" });
    expect(getByText(/testchild/i)).toBeInTheDocument();
  });

  test("It renders children that are passed to a button", () => {
    const { getByText } = setup({
      id: "test",
      children: "testChild",
      onClick: () => {},
    });
    expect(getByText(/testchild/i)).toBeInTheDocument();
  });

  test("Passing an onClick renders a button", () => {
    const { getByTestId } = setup({ id: "test", onClick: () => {} });
    expect(getByTestId("test-button")).toBeInTheDocument();
  });

  test("Not passing an onClick renders a div", () => {
    const { getByTestId } = setup({ id: "test" });
    expect(getByTestId("test-container")).toBeInTheDocument();
  });

  test("The onClick handler is called onClick", () => {
    const onClick = jest.fn();
    const { getByTestId } = setup({ id: "test", onClick: onClick });
    const button = getByTestId("test-button");

    act(() => {
      fireEvent.click(button);
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
