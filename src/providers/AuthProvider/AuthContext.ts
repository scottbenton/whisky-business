import { createContext } from "react";
import { RegistrationForm } from "classes/fields/RegistrationFields";
import {
  SignUpAttributes,
  signUp,
  confirmCode,
  signIn,
  signOut,
  updateAttributes,
  changePassword,
} from "./authFunctions";
import { SignInForm } from "classes/fields/SignInForm";
import { UserDTO } from "classes/dto/UserDTO";
import { PasswordFields } from "classes/fields/PasswordFields";
import { UserAttributeFields } from "classes/fields/UserAttributeFields";

export interface AuthContextTypes {
  signUp: (registration: RegistrationForm) => Promise<SignUpAttributes>;
  confirmCode: (email: string, code: string) => Promise<string>;
  signIn: (signInFields: SignInForm) => Promise<string>;
  user?: UserDTO;
  signOut: () => Promise<string>;
  updatePassword: (fields: PasswordFields) => Promise<string>;
  updateAttributes: (fields: UserAttributeFields) => Promise<string>;
}

export const defaultContextValues: AuthContextTypes = {
  signUp: signUp,
  confirmCode: confirmCode,
  signIn: signIn,
  signOut: signOut,
  updatePassword: changePassword,
  updateAttributes: updateAttributes,
};

export const AuthContext = createContext<AuthContextTypes>(
  defaultContextValues
);
