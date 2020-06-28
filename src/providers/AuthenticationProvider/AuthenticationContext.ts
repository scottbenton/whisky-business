import { createContext } from "react";
import {
  CognitoUser,
  ISignUpResult,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { RegistrationForm } from "classes/fields/RegistrationFields";
import { SignInForm } from "classes/fields/SignInForm";

export interface AuthenticationContextTypes {
  user?: CognitoUser | null;
  register: (userFields: RegistrationForm) => Promise<ISignUpResult>;
  signIn: (userFields: SignInForm) => Promise<string>;
}

export const AuthenticationContext = createContext<AuthenticationContextTypes | null>(
  null
);
