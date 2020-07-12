import React from "react";
import { Link, useHistory } from "react-router-dom";
import { pageConfig } from "pages";
import { IconButton } from "components/shared/IconButton";
import { Cog } from "react-zondicons";
import { Button } from "components/shared/Button";
import { useAuth } from "providers/AuthProvider";

export const NavBar: React.FC = (props) => {
  const { user } = useAuth();
  const history = useHistory();

  return (
    <div className={" px-8 py-6 gradient text-primary-darker shadow-xl"}>
      <div
        className={
          "flex justify-between items-center max-w-screen-xl mx-auto w-full"
        }
      >
        <Link
          className={
            "text-center text-3xl font-title font-bold hover:underline text-white text-shadow"
          }
          to={pageConfig.home.path}
        >
          Whisky Business
        </Link>
        {user ? (
          <IconButton
            icon={Cog}
            tooltip={"Account Settings"}
            id={"more"}
            color={"inherit"}
            onClick={() => history.push(pageConfig.settings.path)}
          />
        ) : (
          <div
            className={
              "flex items-center text-primary-darkest border-primary-darkest"
            }
          >
            <Button
              id={"sign-in"}
              onClick={() => history.push(pageConfig.signIn.path)}
            >
              Sign In
            </Button>
            <div className={"py-3 mx-1 border border-primary-dark"} />
            <Button
              id={"create-account"}
              onClick={() => history.push(pageConfig.register.path)}
            >
              Create Account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
