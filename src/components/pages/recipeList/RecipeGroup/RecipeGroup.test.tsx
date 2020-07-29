import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { RecipeGroup, RecipeGroupProps } from "./RecipeGroup";
import "@testing-library/jest-dom/extend-expect";
import { createId } from "utils/idHelpers";

afterEach(cleanup);

describe("Recipe List Item Tests", () => {
  const recipeOpenMock = jest.fn();
  const DEFAULT_PROPS: React.PropsWithChildren<RecipeGroupProps> = {
    categoryName: "group",
    recipes: [
      {
        name: "recipe1",
        id: "abc",
      },
      {
        name: "recipe2",
        id: "cba",
      },
    ],
    onRecipeOpen: recipeOpenMock,
  };

  const setup = (props?: React.PropsWithChildren<RecipeGroupProps>) => {
    const componentProps = props || DEFAULT_PROPS;

    return render(<RecipeGroup {...componentProps} />);
  };

  test("Renders Category name and recipes", () => {
    const { getByText } = setup();

    expect(getByText(/group/i)).toBeInTheDocument();
    expect(getByText(/recipe1/i)).toBeInTheDocument();
    expect(getByText(/recipe2/i)).toBeInTheDocument();
  });

  test("On Click handlers call different ids for different recipes", () => {
    const { getByTestId } = setup();

    const card1 = getByTestId(createId("recipe1", "link"));
    const card2 = getByTestId(createId("recipe2", "link"));

    act(() => {
      fireEvent.click(card1);
    });

    expect(recipeOpenMock).toHaveBeenCalledTimes(1);
    expect(recipeOpenMock).toHaveBeenCalledWith("abc");

    act(() => {
      fireEvent.click(card2);
    });

    expect(recipeOpenMock).toHaveBeenCalledTimes(2);
    expect(recipeOpenMock).toHaveBeenCalledWith("cba");
  });
});
