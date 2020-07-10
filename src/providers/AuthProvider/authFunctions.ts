import { Auth } from "aws-amplify";
import { RegistrationForm } from "classes/fields/RegistrationFields";
import { ISignUpResult, CognitoUser } from "amazon-cognito-identity-js";
import { SignInForm } from "classes/fields/SignInForm";
import { PasswordFields } from "classes/fields/PasswordFields";
import { UserAttributeFields } from "classes/fields/UserAttributeFields";

export interface SignUpAttributes {
  user: CognitoUser;
  isConfirmed: boolean;
}
export function signUp(
  registration: RegistrationForm
): Promise<SignUpAttributes> {
  return new Promise((resolve, reject) => {
    Auth.signUp({
      username: registration.email,
      password: registration.password,
      attributes: {
        email: registration.email,
        name: registration.firstName + " " + registration.lastName,
        "custom:firstName": registration.firstName,
        "custom:lastName": registration.lastName,
      },
    })
      .then((result: ISignUpResult) => {
        const { user, userConfirmed } = result;
        resolve({ user: user, isConfirmed: userConfirmed });
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function confirmCode(email: string, code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    Auth.confirmSignUp(email, code)
      .then(() => {
        resolve("Success");
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function signIn(fields: SignInForm): Promise<string> {
  return new Promise((resolve, reject) => {
    Auth.signIn(fields.email, fields.password)
      .then(() => {
        resolve("Success");
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
}

export function signOut(): Promise<string> {
  return new Promise((resolve, reject) => {
    Auth.signOut()
      .then(() => resolve("Success"))
      .catch((e) => reject(e));
  });
}

export function changePassword(fields: PasswordFields): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, fields.oldPassword, fields.newPassword);
      resolve("Success");
    } catch (e) {
      reject(e);
    }
  });
}

export function updateAttributes(fields: UserAttributeFields): Promise<string> {
  const { firstName, lastName } = fields;
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        name: firstName + " " + lastName,
        "custom:firstName": firstName,
        "custom:lastName": lastName,
      });
      resolve("Success");
    } catch (e) {
      reject(e);
    }
  });
}
