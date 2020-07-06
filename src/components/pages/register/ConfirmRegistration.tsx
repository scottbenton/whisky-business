import React from "react";
import { Form } from "react-final-form";
import { TextFormField } from "components/shared/TextInput/TextFormField";
import { Button } from "components/shared/Button";
import { useAuth } from "providers/AuthProvider";
import { Alert } from "components/shared/Alert";
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";

export interface ConfirmRegistrationProps {
  email: string;
}
export const ConfirmRegistration: React.FC<ConfirmRegistrationProps> = (
  props
) => {
  const { email } = props;
  const { confirmCode } = useAuth();
  const history = useHistory();

  const [error, setError] = React.useState<Error | undefined>();

  const handleSubmit = ({ code }: { code: string }) => {
    setError(undefined);
    confirmCode(email, code)
      .then(() => {
        history.push(pageConfig.recipeList.path);
      })
      .catch((e: Error) => {
        setError(e);
      });
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
        component={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextFormField label={"Code"} id={"code"} fieldName={"code"} />
            <div className={"flex items-end"}>
              <Button type={"submit"} id={"validate"} variant={"primary"}>
                Validate
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};
