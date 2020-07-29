type shareSettings = "private" | "unlisted" | "public";

export interface IRecipeDTO {
  categoryName?: string;

  name: string;
  description?: string;
  author: string;

  ingredients: string[];
  steps: string[];

  servings?: number;
  cookTime?: number;
  prepTime?: number;

  shareSettings: shareSettings;
}

export class RecipeDTO implements IRecipeDTO {
  categoryName?: string;

  name: string;
  description?: string;
  author: string;

  ingredients: string[] = [];
  steps: string[] = [];

  servings?: number;
  cookTime?: number;
  prepTime?: number;

  dateSubmitted: Date = new Date();
  dateModified: Date = new Date();

  shareSettings: shareSettings;

  constructor(recipeDTO: IRecipeDTO) {
    this.categoryName = this.categoryName || "Misc.";

    this.name = recipeDTO.name;
    this.description = recipeDTO.description;
    this.author = recipeDTO.author;

    this.ingredients = recipeDTO.ingredients;
    this.steps = recipeDTO.ingredients;

    this.servings = recipeDTO.servings;
    this.cookTime = recipeDTO.cookTime;
    this.prepTime = recipeDTO.prepTime;

    this.shareSettings = recipeDTO.shareSettings;
  }

  public validate() {
    let errors: { [key: string]: string } = {};

    if (!this.name) {
      errors.name = "Name is required.";
    }
    if (!Array.isArray(this.steps) || this.steps.length === 0) {
      errors.steps = "You must add at least one step";
    }
    if (!Array.isArray(this.ingredients) || this.ingredients.length === 0) {
      errors.ingredients = "You must add at least one ingredient";
    }

    return errors;
  }
}
