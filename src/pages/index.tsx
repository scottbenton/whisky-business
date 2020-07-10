import React, { FunctionComponent } from "react";
import { SettingsPage } from "./SettingsPage";
const RecipeListPage = React.lazy(() => import("./RecipeListPage"));
const RecipePage = React.lazy(() => import("./RecipePage"));
const RegisterPage = React.lazy(() => import("./RegisterPage"));
const SignInPage = React.lazy(() => import("./SignInPage"));
const HomePage = React.lazy(() => import("./HomePage"));

// import { RecipeListPage } from "./RecipeListPage";
// import { RecipePage } from "./RecipePage";
// import { RegisterPage } from "./RegisterPage";
// import { SignInPage } from "./SignInPage";
// import { HomePage } from "./HomePage";

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
    path: "/recipes/:recipeID",
    exact: true,
    component: (props) => <RecipePage {...props} />,
  },
  recipeList: {
    path: "/recipes",
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
  home: {
    path: "/",
    exact: true,
    component: (props) => <HomePage {...props} />,
  },
  settings: {
    path: "/settings",
    exact: true,
    component: (props) => <SettingsPage {...props} />,
  },
};
