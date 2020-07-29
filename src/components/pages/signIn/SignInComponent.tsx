import React, { useEffect } from "react";
import { useAuth } from "providers/AuthProvider";
import { Form } from "react-final-form";
import { Alert } from "components/shared/Alert";
import { TextInputFormField } from "components/shared/TextInput/TextInputFormField";
import { Button } from "components/shared/Button";
import { SignInForm, ISignInForm } from "classes/fields/SignInForm";
import { useHistory, Link } from "react-router-dom";
import { pageConfig } from "pages";

const validate = async (values: ISignInForm) => {
  let form = new SignInForm(values);
  return form.validate();
};

export const SignInComponent: React.FC = () => {
  const { signIn, user } = useAuth();
  const history = useHistory();

  const [error, setError] = React.useState<Error | undefined>();

  useEffect(() => {
    if (user) {
      history.push(pageConfig.recipeList.path);
    }
  }, [user, history]);

  const onSubmit = async (values: ISignInForm) => {
    const formValues = new SignInForm(values);
    setError(undefined);
    try {
      await signIn(formValues);
    } catch (e) {
      setError(e);
    }
  };

  const handleCancel = () => {
    history.push(pageConfig.home.path);
  };

  return (
    <>
      {error && (
        <Alert type={"error"} title={"Error"} message={error.message} />
      )}
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, pristine, submitting }) => (
          <form onSubmit={handleSubmit} autoComplete={"no"}>
            <TextInputFormField
              fieldName={"email"}
              id="email"
              placeholder={"scott@scottbenton.dev"}
              label={"Email Address"}
              required={true}
            />
            <TextInputFormField
              fieldName={"password"}
              id="password"
              label={"Password"}
              required={true}
              type={"password"}
            />
            <Link
              className={"text-primary-dark underline text-sm font-semibold"}
              to={pageConfig.forgotPassword.path}
            >
              Forgot Password?
            </Link>
            <div className={"flex justify-end mt-4 mb-2"}>
              <Button
                id={"cancel"}
                type={"button"}
                onClick={handleCancel}
                containerClassName={"mr-1"}
              >
                Cancel
              </Button>
              <Button
                id={"sign-in"}
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                disabled={submitting || pristine}
                loading={submitting}
              >
                Sign In
              </Button>
            </div>
          </form>
        )}
      />
    </>
  );
};
