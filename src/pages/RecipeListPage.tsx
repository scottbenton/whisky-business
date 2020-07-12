import React from "react";
import { RecipeGroup } from "components/pages/recipeList/RecipeGroup";
import { RecipeListType } from "components/pages/recipeList/recipeListTypes";

const RecipeListPage: React.FC = (props) => {
  const recipes: RecipeListType = require("components/pages/MockRecipeList.json");

  return (
    <>
      <h2 className={"text-center text-xl text-gray-700"}>
        Store your favorite recipes for easy reference
      </h2>
      <div>
        {Object.values(recipes).map((recipe, index) => (
          <RecipeGroup key={index} {...recipe} onRecipeOpen={() => {}} />
        ))}
      </div>
    </>
  );
};

export default RecipeListPage;
