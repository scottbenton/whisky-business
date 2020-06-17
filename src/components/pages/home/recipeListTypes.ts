export interface RecipeListItemType {
  imageUrl: string;
  name: string;
  description: string;
  time: number;
}

export interface RecipeListGroupType {
  categoryName: string;
  recipes: {
    [key: string]: RecipeListItemType;
  };
}

export interface RecipeListType {
  [key: string]: RecipeListGroupType;
}
