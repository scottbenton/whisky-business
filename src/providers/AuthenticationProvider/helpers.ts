import {
  CognitoUserPool,
  ICognitoUserPoolData,
  CognitoUserAttribute,
  ISignUpResult,
  NodeCallback,
  CognitoUserSession,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { RegistrationForm } from "classes/fields/RegistrationFields";
import { SignInForm } from "classes/fields/SignInForm";

const userPoolData: ICognitoUserPoolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID || "",
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || "",
};
export const userPool: CognitoUserPool = new CognitoUserPool(userPoolData);

export function getCurrentUser() {
  let cognitoUser = userPool.getCurrentUser();
  console.debug("COGNITO USER:", cognitoUser);
  if (cognitoUser != null) {
    cognitoUser.getSession((err: Error, session: CognitoUserSession) => {
      if (err) {
        console.error(err.name + ": " + err.message);
        return;
      }
      console.debug("Session Validity: " + session.isValid());

      cognitoUser?.getUserAttributes(
        (err?: Error, attributes?: CognitoUserAttribute[]) => {
          if (err) {
            console.error(err);
            return;
          } else if (attributes) {
            console.debug(attributes);
          }
        }
      );
    });
  }

  return cognitoUser;
}

export function signUserIn(userFields: SignInForm): Promise<CognitoUser> {
  return new Promise((resolve, reject) => {
    const { email, password } = userFields;
    console.debug("HIT HERE");

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        console.debug("SUCCESS");
        resolve(cognitoUser);
      },
      onFailure: (err: Error) => {
        console.debug("ERROR");
        reject(err);
      },
    });
  });
}

export function registerUser(
  userFields: RegistrationForm,
  callback: NodeCallback<Error, ISignUpResult>
) {
  let attributeList: CognitoUserAttribute[] = [];

  const { firstName, lastName, email, password } = userFields;

  attributeList.push(
    new CognitoUserAttribute({
      Name: "given_name",
      Value: firstName,
    })
  );

  attributeList.push(
    new CognitoUserAttribute({
      Name: "family_name",
      Value: lastName,
    })
  );

  let validationList: CognitoUserAttribute[] = [];

  userPool.signUp(email, password, attributeList, validationList, callback);
}
