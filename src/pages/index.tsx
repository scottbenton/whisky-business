import React, { FunctionComponent } from "react";
import { HomePage } from "./HomePage";
import { RecipePage } from "./RecipePage";

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
    component: (props) => <HomePage {...props} />,
  },
};
