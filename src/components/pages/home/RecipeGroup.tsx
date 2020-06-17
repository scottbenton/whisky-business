import React from "react";
import { RecipeListItem } from "./RecipeListItem";
import { RecipeListGroupType } from "./recipeListTypes";

interface RecipeGroupProps extends RecipeListGroupType {}

export const RecipeGroup: React.FC<RecipeGroupProps> = (props) => {
  const { categoryName, recipes } = props;

  return (
    <div className={"max-w-2xl mx-auto w-full mt-12 px-2"}>
      <h3 className={" px-4 uppercase font-bold text-xl "}>{categoryName}</h3>
      <div className={"border-gray-500 border-b-2 -mt-1"} />
      {Object.values(recipes).map((recipe, index) => (
        <RecipeListItem key={index} {...recipe} />
      ))}
    </div>
  );
};
