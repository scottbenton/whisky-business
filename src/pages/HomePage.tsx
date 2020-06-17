import React from "react";
import { RecipeGroup } from "components/pages/home/RecipeGroup";
import { RecipeListType } from "components/pages/home/recipeListTypes";

export const HomePage: React.FC = (props) => {
  const recipes: RecipeListType = require("../components/pages/MockRecipeList.json");

  return (
    <>
      <h1 className={"text-center text-4xl"}>Whisky Business</h1>
      <h2 className={"text-center text-xl text-gray-700"}>
        Store your favorite recipes for easy reference
      </h2>
      <div>
        {Object.values(recipes).map((recipe, index) => (
          <RecipeGroup key={index} {...recipe} />
        ))}
      </div>
    </>
  );
};
