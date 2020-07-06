import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Auth } from "aws-amplify";

export const useAuth = () => {
  const contextValues = useContext(AuthContext);
  return contextValues;
};
