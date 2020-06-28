import React from "react";
import { Card } from "components/shared/Card";
import { RegistrationComponent } from "components/pages/register/RegistrationComponent";
import { UserSolidCircle } from "react-zondicons";

export const RegisterPage: React.FC = (props) => {
  return (
    <div className={"flex flex-col flex-grow w-full justify-center"}>
      <Card className={"max-w-lg mx-auto w-full px-8 py-4 shadow-xl"}>
        <div className={"flex items-center mb-4"}>
          <UserSolidCircle
            className={"fill-current text-green-500"}
            size={24}
          />
          <h2 className={"ml-2 text-2xl text-gray-700 font-semibold"}>
            Create your Account
          </h2>
        </div>
        <RegistrationComponent />
      </Card>
    </div>
  );
};
