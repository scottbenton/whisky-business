import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider } from "./AuthenticationProvider";

export const AppProviders: React.FC = (props) => {
  const { children } = props;

  return (
    <AuthenticationProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthenticationProvider>
  );
};
