import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Ripple from "react-ripples";

export interface InputAdornmentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
}

export const InputAdornment: React.FC<InputAdornmentProps> = (props) => {
  const { children, className, id, ...buttonProps } = props;
  const { onClick } = props;

  const classes = clsx(
    className,
    "px-4 h-full bg-gray-200 focus:outline-none text-gray-700 fill-current"
  );

  const descriptiveId = id + (onClick ? "-button" : "-container");

  if (onClick) {
    return (
      <Ripple during={500} color={"rgba(0, 0, 0, .3)"}>
        <button
          className={clsx(classes, "hover:bg-gray-400")}
          type={"button"}
          id={descriptiveId}
          data-testid={descriptiveId}
          {...buttonProps}
        >
          {children}
        </button>
      </Ripple>
    );
  } else {
    return <div className={classes}>{children}</div>;
  }
};
