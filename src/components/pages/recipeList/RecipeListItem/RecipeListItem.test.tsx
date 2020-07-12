import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { RecipeListItem, RecipeListItemProps } from "./RecipeListItem";
import "@testing-library/jest-dom/extend-expect";
import { createId } from "utils/idHelpers";

afterEach(cleanup);

describe("Recipe List Item Tests", () => {
  const DEFAULT_PROPS: React.PropsWithChildren<RecipeListItemProps> = {
    name: "Recipe",
    id: "id",
    onClick: () => {},
  };

  const setup = (props?: React.PropsWithChildren<RecipeListItemProps>) => {
    const componentProps = props || DEFAULT_PROPS;

    return render(<RecipeListItem {...componentProps} />);
  };

  test("Renders title and description properly", () => {
    const { getByText } = setup({
      name: "title",
      description: "description",
      id: "id",
      onClick: () => {},
    });

    expect(getByText(/title/i)).toBeInTheDocument();
    expect(getByText(/description/i)).toBeInTheDocument();
  });

  test("Renders image properly", () => {
    const { queryByTestId } = setup({
      name: "title",
      imageUrl: "exampleURL",
      id: "id",
      onClick: () => {},
    });

    expect(queryByTestId("final-product-image")).toBeInTheDocument();
    expect(queryByTestId("no-image-provided-svg")).not.toBeInTheDocument();
  });

  test("Renders blank image when no image is provided", () => {
    const { queryByTestId } = setup({
      name: "title",
      id: "id",
      onClick: () => {},
    });

    expect(queryByTestId("final-product-image")).not.toBeInTheDocument();
    expect(queryByTestId("no-image-provided-svg")).toBeInTheDocument();
  });

  test("Renders time in minutes properly", () => {
    const { getByText } = setup({
      name: "title",
      time: 30,
      id: "id",
      onClick: () => {},
    });

    expect(getByText(/30 minutes/i)).toBeInTheDocument();
  });

  test("Renders time in hours properly", () => {
    const { getByText } = setup({
      name: "title",
      time: 120,
      id: "id",
      onClick: () => {},
    });

    expect(getByText(/2 hours/i)).toBeInTheDocument();
  });

  test("Renders hours and minutes singularly", () => {
    const { getByText } = setup({
      name: "title",
      time: 61,
      id: "id",
      onClick: () => {},
    });
    expect(getByText(/1 hour 1 minute/i)).toBeInTheDocument();
  });

  test("Rounds doubles", () => {
    const { getByText } = setup({
      name: "title",
      time: 5.8,
      id: "id",
      onClick: () => {},
    });
    expect(getByText(/6 minutes/i)).toBeInTheDocument();
  });

  test("Rounds doubles", () => {
    const { getByText } = setup({
      name: "title",
      time: 5.2,
      id: "id",
      onClick: () => {},
    });
    expect(getByText(/5 minutes/i)).toBeInTheDocument();
  });

  test("onClick handler gets called on click", () => {
    const clickFn = jest.fn();
    const { getByTestId } = setup({
      id: "abc",
      name: "title",
      onClick: clickFn,
    });

    const cardComponent = getByTestId(createId("title", "link"));

    act(() => {
      fireEvent.click(cardComponent);
    });

    expect(clickFn).toHaveBeenCalledTimes(1);
    expect(clickFn).toHaveBeenCalledWith("abc");
  });
});
