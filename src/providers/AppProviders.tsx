import React from "react";
import { BrowserRouter } from "react-router-dom";

export const AppProviders: React.FC = (props) => {
  const { children } = props;

  return <BrowserRouter>{children}</BrowserRouter>;
};
