import React from "react";
import { Card } from "components/shared/Card";
import { RegistrationComponent } from "components/pages/register/RegistrationComponent";
import { UserSolidCircle } from "react-zondicons";
import { Button } from "components/shared/Button";
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";

export const RegisterPage: React.FC = (props) => {
  const history = useHistory();

  const handleSignInClick = () => {
    history.push(pageConfig.signIn.path);
  };

  return (
    <div className={"flex flex-col flex-grow w-full justify-center px-2"}>
      <Card className={"max-w-lg mx-auto w-full shadow-xl"}>
        <div className={"flex items-center px-6 py-4"}>
          <UserSolidCircle
            className={"fill-current text-green-500"}
            size={24}
          />
          <h2 className={"ml-2 text-2xl text-gray-700 font-semibold"}>
            Create Account
          </h2>
        </div>
        <div className={"py-4 px-6"}>
          <RegistrationComponent />
        </div>
        <hr className={"mx-12"} />
        <div className={"flex items-center justify-center px-6 py-4"}>
          <span>Already have an account?</span>
          <Button id={"create-account-link"} onClick={handleSignInClick}>
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
};
