import React from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import {
  CognitoUser,
  ISignUpResult,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { RegistrationForm } from "classes/fields/RegistrationFields";
import { registerUser, getCurrentUser, signUserIn } from "./helpers";
import { SignInForm } from "classes/fields/SignInForm";
export const AuthenticationProvider: React.FC = (props) => {
  const { children } = props;

  const [user, setUser] = React.useState<CognitoUser | null>(getCurrentUser());

  const registerNewUser = (userFields: RegistrationForm) => {
    return new Promise((resolve, reject) => {
      const convertCallbackToPromise = (
        err?: Error,
        result?: ISignUpResult
      ) => {
        if (err) {
          reject(err);
        }
        if (result) {
          setUser(result.user);
          resolve(result);
        }
      };

      registerUser(userFields, convertCallbackToPromise);
    }) as Promise<ISignUpResult>;
  };

  console.debug(user);

  const signInUser = (userFields: SignInForm) => {
    return new Promise((resolve, reject) => {
      signUserIn(userFields)
        .then((user: CognitoUser) => {
          setUser(user);
          resolve("success");
        })
        .catch((err: Error) => {
          console.error(err);
          reject(err);
        });
    }) as Promise<string>;
  };

  return (
    <AuthenticationContext.Provider
      value={{ user: user, register: registerNewUser, signIn: signInUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
