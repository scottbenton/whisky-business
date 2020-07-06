import React from "react";
import { useAuth } from "providers/AuthProvider";
import { Form } from "react-final-form";
import { Alert } from "components/shared/Alert";
import { TextFormField } from "components/shared/TextInput/TextFormField";
import { Button } from "components/shared/Button";
import { SignInForm, ISignInForm } from "classes/fields/SignInForm";
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";

const validate = async (values: ISignInForm) => {
  let form = new SignInForm(values);
  return form.validate();
};

export const SignInComponent: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();

  const [error, setError] = React.useState<Error | undefined>();

  const onSubmit = async (values: SignInForm) => {
    setError(undefined);
    signIn(values)
      .then(() => {
        console.debug("Sign in worked");
        history.push(pageConfig.recipeList.path);
      })
      .catch((err: Error) => {
        setError(err);
      });
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
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} autoComplete={"no"}>
            <TextFormField
              fieldName={"email"}
              id="email"
              placeholder={"scott@scottbenton.dev"}
              label={"Email Address"}
              required={true}
            />
            <TextFormField
              fieldName={"password"}
              id="password"
              label={"Password"}
              required={true}
              type={"password"}
            />
            <div className={"flex justify-end mt-4 mb-2"}>
              <Button id={"cancel"} type={"button"} onClick={handleCancel}>
                Cancel
              </Button>
              <Button id={"sign-in"} type={"submit"} variant={"primary"}>
                Sign In
              </Button>
            </div>
          </form>
        )}
      />
    </>
  );
};
