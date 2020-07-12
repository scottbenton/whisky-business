import React, { useEffect } from "react";
import {
  ForgotPasswordFields,
  IForgotPasswordFields,
} from "classes/fields/ForgotPasswordFields";
import { Form } from "react-final-form";
import { TextFormField } from "components/shared/TextInput/TextFormField";
import { Button } from "components/shared/Button";
import { emailValidator } from "utils/validatorHelpers";
import { useAuth } from "providers/AuthProvider";
import { Alert } from "components/shared/Alert";
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";

const validateEmail = async (fields: { email: string }) => {
  const { email } = fields;
  return { email: emailValidator(email) };
};

const validate = async (fields: IForgotPasswordFields) => {
  const passwordFields = new ForgotPasswordFields(fields);
  return passwordFields.validate();
};

export const ForgotPassword: React.FC = () => {
  const { forgotPassword, forgotPasswordSubmit, user } = useAuth();
  const history = useHistory();

  const [passwordFields, setPasswordFields] = React.useState<
    ForgotPasswordFields | undefined
  >();
  const [error, setError] = React.useState<Error | undefined>();

  useEffect(() => {
    if (user) {
      history.push(pageConfig.recipeList.path);
    }
  }, [user, history]);

  const handleEmailAdd = async (fields: { email: string }) => {
    setError(undefined);
    const passwordFields = new ForgotPasswordFields(fields);
    try {
      await forgotPassword(fields.email);
      setPasswordFields(passwordFields);
    } catch (e) {
      setError(e);
    }
  };

  const handleFinalSubmit = async (fields: IForgotPasswordFields) => {
    setError(undefined);
    const passwordFields = new ForgotPasswordFields(fields);
    try {
      await forgotPasswordSubmit(passwordFields);
      setPasswordFields(passwordFields);
    } catch (e) {
      setError(e);
    }
  };

  const handleNavigation = () => {
    history.push(pageConfig.signIn.path);
  };

  if (!passwordFields) {
    return (
      <>
        {error && (
          <Alert type={"error"} title={"Error"} message={error.message} />
        )}
        <span>
          We will send a one time code to your email to verify your identity.
        </span>
        <Form
          onSubmit={handleEmailAdd}
          validate={validateEmail}
          render={({ handleSubmit, pristine, submitting }) => (
            <form onSubmit={handleSubmit}>
              <TextFormField
                fieldName={"email"}
                id={"email"}
                label={"Email"}
                className={"mt-4"}
              />
              <div className={"flex justify-end mt-2"}>
                <Button
                  id={"continue"}
                  variant={"contained"}
                  type={"submit"}
                  color={"primary"}
                  disabled={pristine || submitting}
                  loading={submitting}
                >
                  Continue
                </Button>
              </div>
            </form>
          )}
        />
      </>
    );
  } else if (passwordFields.email && !passwordFields.code) {
    return (
      <>
        {error && (
          <Alert type={"error"} title={"Error"} message={error.message} />
        )}
        <span>A temporary code has been sent to {passwordFields.email}.</span>
        <Form
          onSubmit={handleFinalSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <TextFormField id={"code"} fieldName={"code"} label={"Code"} />
              <TextFormField
                type={"password"}
                id={"new-password"}
                fieldName={"newPassword"}
                label={"New Password"}
              />
              <div className={"flex justify-end mt-2"}>
                <Button
                  id={"finalize"}
                  variant={"contained"}
                  type={"submit"}
                  color={"primary"}
                  disabled={pristine || submitting}
                  loading={submitting}
                >
                  Continue
                </Button>
              </div>
            </form>
          )}
        />
      </>
    );
  } else {
    return (
      <>
        <Alert
          type={"success"}
          title={"Success"}
          message={
            "You have successfully changed your password. Please log in again."
          }
        />
        <div className={"flex justify-end mt-4"}>
          <Button
            id={"login-link"}
            variant={"contained"}
            color={"primary"}
            onClick={handleNavigation}
          >
            Login
          </Button>
        </div>
      </>
    );
  }
};
