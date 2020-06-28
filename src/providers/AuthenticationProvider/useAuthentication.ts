import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
