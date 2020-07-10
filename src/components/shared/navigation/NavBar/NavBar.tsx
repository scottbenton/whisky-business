import React from "react";
import { Link, useHistory } from "react-router-dom";
import { pageConfig } from "pages";
import { IconButton } from "components/shared/IconButton";
import { CheveronDown } from "react-zondicons";
import { Button } from "components/shared/Button";
import { useAuth } from "providers/AuthProvider";

export const NavBar: React.FC = (props) => {
  const { user } = useAuth();
  const history = useHistory();
  return (
    <div className={" px-8 py-6 gradient text-white shadow-xl"}>
      <div
        className={
          "flex justify-between items-center max-w-screen-xl mx-auto w-full"
        }
      >
        <Link
          className={
            "text-center text-3xl font-title font-bold hover:underline"
          }
          to={pageConfig.home.path}
        >
          Whisky Business
        </Link>
        {user ? (
          <IconButton
            icon={CheveronDown}
            tooltip={"Show More"}
            variant={"secondary"}
            id={"more"}
          />
        ) : (
          <Button
            id={"log-in"}
            variant={"secondary"}
            onClick={() => history.push(pageConfig.signIn.path)}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
};
