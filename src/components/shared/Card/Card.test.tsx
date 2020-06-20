import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { Card, CardProps } from "./Card";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("Card Tests", () => {
  const DEFAULT_PROPS: React.PropsWithChildren<CardProps> = {};

  const setup = (overwriteProps?: React.PropsWithChildren<CardProps>) => {
    const cardProps: React.PropsWithChildren<CardProps> = {
      ...overwriteProps,
      ...DEFAULT_PROPS,
    };
    return render(<Card {...cardProps} />);
  };

  test("It renders a div by default", () => {
    const { container } = setup();
    expect(container.querySelector("div")).toBeTruthy();
  });

  test("It can render other elements if passed", () => {
    const { container } = setup({ component: "span" });
    expect(container.querySelector("span")).toBeTruthy();
    expect(container.querySelector("div")).not.toBeTruthy();
  });

  test("It renders children if passed", () => {
    const { getByText } = setup({ children: <span>Hello There</span> });
    expect(getByText("Hello There")).toBeTruthy();
  });

  test("It renders passed classNames correctly", () => {
    const { container: container1 } = setup();
    const { container: container2 } = setup({ className: "bg-red-500" });

    expect(container1.firstChild).not.toHaveClass("bg-red-500");
    expect(container2.firstChild).toHaveClass("bg-red-500");
  });

  test("It handles click events properly", () => {
    const onClick = jest.fn();
    const { getByText } = setup({ children: "Card", onClick: onClick });

    const card = getByText("Card");
    expect(card).toBeInTheDocument();

    act(() => {
      fireEvent.click(card);
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
