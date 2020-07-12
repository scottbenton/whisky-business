import React from "react";
import { Card } from "components/shared/Card";
import { Buoy } from "react-zondicons";
import { ForgotPassword } from "components/pages/forgotPassword/ForgotPassword";

const ForgotPasswordPage: React.FC = (props) => {
  return (
    <div className={"flex flex-col flex-grow w-full justify-center px-2"}>
      <Card className={"max-w-lg mx-auto w-full shadow-xl"} topBorder>
        <div className={"flex items-center px-6 py-4"}>
          <Buoy className={"fill-current text-primary"} size={24} />
          <h2 className={"ml-2 text-2xl text-gray-700 font-semibold"}>
            Forgot Password
          </h2>
        </div>
        <div className={"px-6 py-4"}>
          <ForgotPassword />
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
