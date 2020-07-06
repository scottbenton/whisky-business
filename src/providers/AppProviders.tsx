import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
// Setup AWS Amplify
import { AuthProvider } from "./AuthProvider";

const AppProviders: React.FC = (props) => {
  const { children } = props;

  return (
    <AuthProvider>
      <Suspense fallback={() => <span>Loading...</span>}>
        <BrowserRouter>{children}</BrowserRouter>
      </Suspense>
    </AuthProvider>
  );
};

export default AppProviders;
