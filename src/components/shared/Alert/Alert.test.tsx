import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Alert, AlertProps } from "./Alert";

afterEach(cleanup);

describe("Alert Tests", () => {
  const defaultProps: AlertProps = {
    message: "Default Message",
  };

  const setup = (props?: AlertProps) => {
    return render(<Alert {...(props || defaultProps)} />);
  };

  test("It renders a message when passed", () => {
    const { getByText } = setup();

    expect(getByText(/default message/i)).toBeInTheDocument();
  });

  test("It renders a title as well as a message when passed", () => {
    const props = { ...defaultProps, title: "Default Title" };
    const { getByText } = setup(props);

    expect(getByText(/default title/i)).toBeInTheDocument();
    expect(getByText(/default message/i)).toBeInTheDocument();
  });

  test("Passing default variant has a default background", () => {
    const { container } = setup();
    let alert = container.firstChild;

    expect(alert).toHaveClass("bg-gray-100");
    expect(alert).toHaveClass("text-gray-700");
  });

  test("Passing success variant turns it green", () => {
    const { container } = setup({
      type: "success",
      message: "test",
    });
    let alert = container.firstChild;

    expect(alert).toHaveClass("bg-green-100");
    expect(alert).toHaveClass("text-green-800");
  });

  test("Passing info variant turns it blue", () => {
    const { container } = setup({
      type: "info",
      message: "test",
    });
    let alert = container.firstChild;

    expect(alert).toHaveClass("bg-blue-100");
    expect(alert).toHaveClass("text-blue-700");
  });

  test("Passing warning variant turns it yellow", () => {
    const { container } = setup({
      type: "warning",
      message: "test",
    });
    let alert = container.firstChild;

    expect(alert).toHaveClass("bg-yellow-100");
    expect(alert).toHaveClass("text-yellow-800");
  });

  test("Passing error variant turns it red", () => {
    const { container } = setup({
      type: "error",
      message: "test",
    });
    let alert = container.firstChild;

    expect(alert).toHaveClass("bg-red-100");
    expect(alert).toHaveClass("text-red-700");
  });
});
