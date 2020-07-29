import React from "react";
import { RecipeGroup } from "components/pages/recipeList/RecipeGroup";
import { RecipeListType } from "components/pages/recipeList/recipeListTypes";
import { Button } from "components/shared/Button";
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";

const RecipeListPage: React.FC = (props) => {
  const recipes: RecipeListType = require("components/pages/MockRecipeList.json");
  const history = useHistory();

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
      <div className={"fixed p-8 bottom-0 right-0"}>
        <Button
          id={"add-recipe"}
          containerClassName={"rounded-full shadow-xl"}
          className={"rounded-full pt-1"}
          color={"primary"}
          variant={"contained"}
          onClick={() => history.push(pageConfig.createRecipe.path)}
        >
          <span className={"text-2xl mr-2 leading-none"}>+</span>
          New Recipe
        </Button>
      </div>
    </>
  );
};

export default RecipeListPage;
