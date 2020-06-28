import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import clsx from "clsx";
import Ripples from "react-ripples";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  containerClassName?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    id,
    variant,
    className,
    containerClassName,
    onClick,
    ...buttonProps
  } = props;

  const descriptiveId = id + "-button";

  const handleClick = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    evt.currentTarget.blur();
    onClick && onClick(evt);
  };

  let classes = clsx(
    "px-4 py-2 rounded-full tracking-wide focus:outline-none font-semibold uppercase text-sm box-border border-2 border-transparent focus:border-green-900",
    className
  );
  let containerClasses = clsx("m-1 rounded-full flex", containerClassName);

  switch (variant) {
    case "primary": {
      classes = clsx(
        "bg-green-300 border-2 border-green-500 hover:bg-green-400 shadow-md text-green-900 shadow-md hover:shadow-2xl",
        classes
      );
      containerClasses = clsx(containerClasses, "shadow-md hover:shadow-lg");
      break;
    }
    case "secondary": {
      classes = clsx(
        "border-2 border-green-500 hover:bg-green-100 focus:border-green-700 text-green-700",
        classes
      );
      break;
    }
    default: {
      classes = clsx("hover:bg-gray-200 focus:border-gray-700", classes);
      break;
    }
  }

  return (
    <div className={containerClasses}>
      <Ripples
        during={500}
        color={"rgba(0, 0, 0, .3)"}
        className={"rounded-full"}
      >
        <button
          className={classes}
          id={descriptiveId}
          data-testid={descriptiveId}
          onClick={handleClick}
          {...buttonProps}
        >
          {children}
        </button>
      </Ripples>
    </div>
  );
};
