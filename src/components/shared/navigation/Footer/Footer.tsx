import React from "react";
import { Button } from "components/shared/Button";
import { useAuth } from "providers/AuthProvider";

export const Footer: React.FC = (props) => {
  const { user, signOut } = useAuth();
  return (
    <div className={"px-4 py-2 bg-white"}>
      <div
        className={
          "flex justify-between items-center max-w-screen-xl mx-auto w-full"
        }
      >
        <span>
          Created by{" "}
          <a
            href={"https://scottbenton.dev"}
            className={"text-green-700 underline font-semibold"}
          >
            Scott Benton
          </a>
        </span>
        {user && (
          <Button id={"log-out"} variant={"tertiary"} onClick={() => signOut()}>
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
};
