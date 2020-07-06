import { createContext } from "react";
import { RegistrationForm } from "classes/fields/RegistrationFields";
import {
  SignUpAttributes,
  signUp,
  confirmCode,
  signIn,
  signOut,
} from "./authFunctions";
import { SignInForm } from "classes/fields/SignInForm";
import { UserDTO } from "classes/dto/UserDTO";

export interface AuthContextTypes {
  signUp: (registration: RegistrationForm) => Promise<SignUpAttributes>;
  confirmCode: (email: string, code: string) => Promise<string>;
  signIn: (signInFields: SignInForm) => Promise<string>;
  user?: UserDTO;
  signOut: () => Promise<string>;
}

export const defaultContextValues: AuthContextTypes = {
  signUp: signUp,
  confirmCode: confirmCode,
  signIn: signIn,
  signOut: signOut,
};

export const AuthContext = createContext<AuthContextTypes>(
  defaultContextValues
);
