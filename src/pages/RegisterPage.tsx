import React from "react";
import { Card } from "components/shared/Card";
import { RegistrationComponent } from "components/pages/register/RegistrationComponent";
import { UserSolidCircle } from "react-zondicons";
import { Button } from "components/shared/Button";
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";
import { ConfirmRegistration } from "components/pages/register/ConfirmRegistration";
import { IRegistrationForm } from "classes/fields/RegistrationFields";

const RegisterPage: React.FC = (props) => {
  const history = useHistory();

  const [registrationFields, setRegistrationFields] = React.useState<
    IRegistrationForm | undefined
  >();

  const handleSignInClick = () => {
    history.push(pageConfig.signIn.path);
  };

  return (
    <div className={"flex flex-col flex-grow w-full justify-center px-2"}>
      <Card className={"max-w-lg mx-auto w-full shadow-xl"} topBorder>
        <div className={"flex items-center px-6 pt-4"}>
          <UserSolidCircle className={"fill-current text-primary"} size={24} />
          <h2 className={"ml-2 text-xl text-gray-700 font-semibold"}>
            {!registrationFields ? "Create Account" : "Confirm Email"}
          </h2>
        </div>
        <div className={"py-4 px-6"}>
          {!registrationFields ? (
            <RegistrationComponent
              setRegistrationFields={setRegistrationFields}
            />
          ) : (
            <ConfirmRegistration registrationFields={registrationFields} />
          )}
        </div>
        {!registrationFields && (
          <>
            <hr className={"mx-12"} />
            <div className={"flex items-center justify-center px-6 py-4"}>
              <span>Already have an account?</span>
              <Button id={"create-account-link"} onClick={handleSignInClick}>
                Sign In
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default RegisterPage;
