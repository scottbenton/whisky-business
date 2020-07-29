export interface RecipeListItemType {
  id: string;
  imageUrl?: string;
  name: string;
  description?: string;
  time?: number;
}

export interface RecipeListGroupType {
  categoryName: string;
  recipes: RecipeListItemType[];
}

export interface RecipeListType {
  [key: string]: RecipeListGroupType;
}
