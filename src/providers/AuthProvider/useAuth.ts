import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const contextValues = useContext(AuthContext);
  return contextValues;
};
