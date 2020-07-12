import React from "react";
import clsx from "clsx";

export interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = (props) => {
  const { className } = props;

  return (
    <div
      id={"loading-spinner"}
      data-testid={"loading-spinner"}
      className={clsx(
        className ?? "",
        "spinner rounded-full inline-block border-r-2 border-l-2 border-current box-border"
      )}
    ></div>
  );
};
