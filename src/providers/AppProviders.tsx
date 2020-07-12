import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";

const AppProviders: React.FC = (props) => {
  const { children } = props;

  return (
    <AuthProvider>
      <Suspense fallback={<> </>}>
        <BrowserRouter>{children}</BrowserRouter>
      </Suspense>
    </AuthProvider>
  );
};

export default AppProviders;
