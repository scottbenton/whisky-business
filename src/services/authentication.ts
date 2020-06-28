import {
  CognitoUserPool,
  ICognitoUserPoolData,
  CognitoUserAttribute,
  ISignUpResult,
  NodeCallback,
} from "amazon-cognito-identity-js";
import { RegistrationForm } from "classes/fields/RegistrationFields";

const userPoolData: ICognitoUserPoolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID || "",
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || "",
};
export const userPool: CognitoUserPool = new CognitoUserPool(userPoolData);

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
