import React from "react";
import { RecipeEditor } from "components/pages/recipeEdit/RecipeEditor";

const CreateRecipePage: React.FC = (props) => {
  return (
    <div className={" px-2 mx-auto flex flex-col w-full max-w-xl"}>
      <h1 className={"text-2xl font-semibold"}>Create your Recipe</h1>
      <RecipeEditor />
    </div>
  );
};
export default CreateRecipePage;
