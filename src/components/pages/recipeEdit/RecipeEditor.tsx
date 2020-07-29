import React from "react";
import {
  TextAreaFormField,
  TextInputFormField,
} from "components/shared/TextInput";
import { Form } from "react-final-form";
import { DraggableListFormField } from "./DraggableListFormField";
import { InputAdornment } from "components/shared/TextInput/InputAdornment";
import { Button } from "components/shared/Button";
import { IRecipeDTO, RecipeDTO } from "classes/dto/RecipeDTO";

export const RecipeEditor: React.FC = (props) => {
  const handleSubmit = () => {};
  const handleValidate = (values: IRecipeDTO) => {
    let recipeDTO = new RecipeDTO(values);

    return recipeDTO.validate();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={handleValidate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={"flex flex-col"}>
            <h3 className={"text-lg mt-4"}>Recipe Basics</h3>
            <TextInputFormField
              fieldName={"name"}
              id={"name"}
              label={"Recipe Name"}
              required
            />
            <TextAreaFormField
              fieldName={"description"}
              id={"description"}
              label={"Description"}
              rows={6}
            />
            <TextInputFormField
              fieldName={"categoryName"}
              id={"category-name"}
              label={"Category Name"}
              helperText={"ex: Baked Goods or Italian"}
            />

            <h3 className={"text-lg mt-4"}>Recipe Instructions</h3>
            <DraggableListFormField
              name={"ingredients"}
              label={"Ingredients"}
            />

            <DraggableListFormField name={"steps"} label={"Steps"} />

            <h3 className={"text-lg mt-4"}>Recipe Details</h3>
            <TextInputFormField
              fieldName={"servings"}
              id={"servings"}
              label={"# of Servings"}
              min={"0"}
              endAdornment={
                <InputAdornment id={"minutes"}>servings</InputAdornment>
              }
              type={"number"}
            />
            <TextInputFormField
              fieldName={"cookTime"}
              id={"cook-time"}
              label={"Cook Time"}
              min={"0"}
              endAdornment={
                <InputAdornment id={"minutes"}>minutes</InputAdornment>
              }
              type={"number"}
            />
            <TextInputFormField
              fieldName={"prepTime"}
              id={"prep-time"}
              label={"Prep Time"}
              min={"0"}
              endAdornment={
                <InputAdornment id={"minutes"}>minutes</InputAdornment>
              }
              type={"number"}
            />
          </div>
          <div className={"flex justify-end mt-4"}>
            <Button
              variant={"contained"}
              color={"primary"}
              id={"create-recipe"}
            >
              Create Recipe
            </Button>
          </div>
        </form>
      )}
    />
  );
};
