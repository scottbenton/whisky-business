import React, { HTMLProps, ButtonHTMLAttributes, ReactElement } from "react";
import clsx from "clsx";
import Ripple from "react-ripples";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon: ReactElement;
  noMargin?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, className, noMargin, ...buttonProps } = props;

  return (
    <div>
      <Ripple
        during={500}
        color={"rgba(0, 0, 0, .3)"}
        className={"rounded-full"}
      >
        <button
          className={clsx(
            className,
            noMargin ? "p-0" : "p-4",
            "hover:bg-gray-200"
          )}
          {...buttonProps}
        >
          {React.cloneElement(icon, { className: "w-4 h-4" })}
        </button>
      </Ripple>
    </div>
  );
};
