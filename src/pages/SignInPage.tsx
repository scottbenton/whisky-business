import React from "react";
import { Card } from "components/shared/Card";
import { SignInComponent } from "components/pages/signIn/SignInComponent";
import { UserSolidCircle } from "react-zondicons";
import { Button } from "components/shared/Button";
import { useHistory } from "react-router-dom";
import { pageConfig } from "pages";

const SignInPage: React.FC = (props) => {
  const history = useHistory();

  const handleCreateClick = () => {
    history.push(pageConfig.register.path);
  };

  return (
    <div className={"flex flex-col flex-grow w-full justify-center px-2"}>
      <Card className={"max-w-lg mx-auto w-full shadow-xl"} topBorder>
        <div className={"flex items-center px-6 py-4"}>
          <UserSolidCircle
            className={"fill-current text-green-500"}
            size={24}
          />
          <h2 className={"ml-2 text-2xl text-gray-700 font-semibold"}>
            Sign In
          </h2>
        </div>
        <div className={"px-6 py-4"}>
          <SignInComponent />
        </div>
        <hr className={"mx-12"} />
        <div className={"px-6 py-2 flex justify-center items-center"}>
          <span>Need an account?</span>
          <Button id={"create-account-link"} onClick={handleCreateClick}>
            Create Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
