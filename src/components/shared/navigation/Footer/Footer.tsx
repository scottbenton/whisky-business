import React from "react";

export const Footer: React.FC = (props) => {
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
            className={"text-primary-dark underline font-semibold"}
          >
            Scott Benton
          </a>
        </span>
      </div>
    </div>
  );
};
