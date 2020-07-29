import React, { FunctionComponent } from "react";
const SettingsPage = React.lazy(() => import("./SettingsPage"));
const CreateRecipePage = React.lazy(() => import("./CreateRecipePage"));
const RecipeListPage = React.lazy(() => import("./RecipeListPage"));
const RecipePage = React.lazy(() => import("./RecipePage"));
const RegisterPage = React.lazy(() => import("./RegisterPage"));
const SignInPage = React.lazy(() => import("./SignInPage"));
const HomePage = React.lazy(() => import("./HomePage"));
const ForgotPasswordPage = React.lazy(() => import("./ForgotPasswordPage"));

export interface PageConfigEntry {
  path: string;
  exact: boolean;
  component: FunctionComponent;
  label?: string;
  icon?: React.ReactNode;
  hideWhenAuthenticated?: boolean;
  hideWhenUnauthenticated?: boolean;
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
    label: "Recipes",
    hideWhenUnauthenticated: true,
    component: (props) => <RecipeListPage {...props} />,
  },
  signIn: {
    path: "/sign-in",
    exact: true,
    label: "Sign In",
    hideWhenAuthenticated: true,
    component: (props) => <SignInPage {...props} />,
  },
  register: {
    path: "/create-account",
    exact: true,
    label: "Create Account",
    hideWhenAuthenticated: true,
    component: (props) => <RegisterPage {...props} />,
  },
  forgotPassword: {
    path: "/forgot-password",
    exact: true,
    component: (props) => <ForgotPasswordPage {...props} />,
  },
  home: {
    path: "/",
    exact: true,
    component: (props) => <HomePage {...props} />,
  },
  settings: {
    path: "/settings",
    exact: true,
    hideWhenUnauthenticated: true,
    label: "Account",
    component: (props) => <SettingsPage {...props} />,
  },
  createRecipe: {
    path: "/new",
    exact: true,
    component: (props) => <CreateRecipePage {...props} />,
  },
};
