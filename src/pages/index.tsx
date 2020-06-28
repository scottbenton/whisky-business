import React, { FunctionComponent } from "react";
import { RecipeListPage } from "./RecipeListPage";
import { RecipePage } from "./RecipePage";
import { RegisterPage } from "./RegisterPage";
import { SignInPage } from "./SignInPage";

export interface PageConfigEntry {
  path: string;
  exact: true;
  component: FunctionComponent;
}

export interface PageConfig {
  [key: string]: PageConfigEntry;
}

export const pageConfig: PageConfig = {
  recipe: {
    path: "/recipe/:recipeID",
    exact: true,
    component: (props) => <RecipePage {...props} />,
  },
  home: {
    path: "/",
    exact: true,
    component: (props) => <RecipeListPage {...props} />,
  },
  register: {
    path: "/sign-up",
    exact: true,
    component: (props) => <RegisterPage {...props} />,
  },
  signIn: {
    path: "/sign-in",
    exact: true,
    component: (props) => <SignInPage {...props} />,
  },
};
