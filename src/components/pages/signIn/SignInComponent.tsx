import React from "react";
import { useAuthentication } from "providers/AuthenticationProvider";
import { Form } from "react-final-form";
import { Alert } from "components/shared/Alert";
import { TextFormField } from "components/shared/TextInput/TextFormField";
import { Button } from "components/shared/Button";
import { SignInForm, ISignInForm } from "classes/fields/SignInForm";

export const SignInComponent: React.FC = () => {
  const { signIn } = useAuthentication() || {};

  const [error, setError] = React.useState<Error | undefined>();

  const onSubmit = (values: ISignInForm) => {
    console.debug(JSON.stringify(values));
    signIn &&
      signIn(values)
        .then(() => {
          console.debug("Sign in worked");
        })
        .catch((err: Error) => {
          console.error("HEY I'M AN ERROR");
          setError(err);
        });
  };

  const handleCancel = () => {
    let error = new Error("This is a description of how you fucked up");
    error.name = "I'm an error";
    setError(error);
  };

  console.debug(error);

  return (
    <>
      {error && (
        <Alert type={"error"} title={"Error"} message={error.message} />
      )}
      <Form
        onSubmit={onSubmit}
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
              <Button id={"submit"} type={"submit"} variant={"primary"}>
                Sign In
              </Button>
            </div>
          </form>
        )}
      />
    </>
  );
};
