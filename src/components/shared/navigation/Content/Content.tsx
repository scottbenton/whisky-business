import React from "react";

export const Content: React.FC = (props) => {
  const { children } = props;

  return (
    <div
      className={"flex-grow py-8 max-w-screen-xl mx-auto w-full flex flex-col"}
    >
      {children}
    </div>
  );
};
