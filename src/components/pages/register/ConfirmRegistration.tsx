import React from "react";
import { Form } from "react-final-form";
import { TextFormField } from "components/shared/TextInput/TextFormField";
import { Button } from "components/shared/Button";
import { useAuth } from "providers/AuthProvider";
import { Alert } from "components/shared/Alert";
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";
import { IRegistrationForm } from "classes/fields/RegistrationFields";
import { SignInForm } from "classes/fields/SignInForm";

export interface ConfirmRegistrationProps {
  registrationFields: IRegistrationForm;
}
export const ConfirmRegistration: React.FC<ConfirmRegistrationProps> = (
  props
) => {
  const { registrationFields } = props;
  const { confirmCode, signIn } = useAuth();
  const history = useHistory();

  const [error, setError] = React.useState<Error | undefined>();

  const handleSubmit = async ({ code }: { code: string }) => {
    setError(undefined);
    try {
      await confirmCode(registrationFields.email, code);
      const signInFields = new SignInForm({
        email: registrationFields.email,
        password: registrationFields.password,
      });
      await signIn(signInFields);
      history.push(pageConfig.recipeList.path);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className={"flex flex-col"}>
      {error && <Alert type={"error"} message={error.message} />}
      <span>
        We have sent a one-time code to your email. Enter it here to confirm
        your registration.
      </span>
      <Form
        onSubmit={handleSubmit}
        component={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <TextFormField label={"Code"} id={"code"} fieldName={"code"} />
            <div className={"flex justify-end"}>
              <Button
                type={"submit"}
                id={"validate"}
                variant={"contained"}
                color={"primary"}
                disabled={submitting || pristine}
                loading={submitting}
              >
                Validate
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};
