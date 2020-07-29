import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import clsx from "clsx";
import Ripples from "react-ripples";
import { Spinner } from "../Spinner";
import { useTransition, animated } from "react-spring";

type colors = "primary" | "default";
type variants = "contained" | "outlined" | "text";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  variant?: variants;
  color?: colors;
  className?: string;
  containerClassName?: string;
  loading?: boolean;
}

const variantColorClassMapping = {
  primary: {
    contained: "btn-primary-contained",
    outlined: "btn-primary-outlined",
    text: "btn-primary-text",
  },
  default: {
    contained: "btn-default-contained",
    outlined: "btn-default-outlined",
    text: "btn-default-text",
  },
};
const variantContainerClassMapping = {
  contained: "btn-container-contained",
  outlined: "",
  text: "",
};
const variantDisabledClassMapping = {
  contained: "btn-contained-disabled",
  outlined: "btn-outlined-disabled",
  text: "btn-text-disabled",
};

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    id,
    variant = "text",
    color = "default",
    className,
    containerClassName,
    onClick,
    loading,
    disabled,
    ...buttonProps
  } = props;

  const descriptiveId = id + "-button";

  const transition = useTransition(loading, null, {
    from: { opacity: 0, width: 0, marginLeft: 0 },
    enter: { opacity: 1, width: 16, marginLeft: 8 },
    leave: { opacity: 0, width: 0, marginLeft: 0 },
  });

  const handleClick = (
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    evt.currentTarget.blur();
    onClick && onClick(evt);
  };

  const isDisabled = disabled || loading;

  return (
    <Ripples
      during={500}
      color={"rgba(0, 0, 0, .3)"}
      className={clsx(
        "btn-container transition-all ease-in-out duration-300",
        variantContainerClassMapping[variant],
        containerClassName
      )}
    >
      <button
        className={clsx(
          "btn transition-all ease-in-out duration-300",
          isDisabled
            ? variantDisabledClassMapping[variant]
            : variantColorClassMapping[color][variant],
          className
        )}
        id={descriptiveId}
        data-testid={descriptiveId}
        onClick={handleClick}
        disabled={isDisabled}
        {...buttonProps}
      >
        {children}
        {transition.map(
          ({ item, props, key }) =>
            item && (
              <animated.div style={props} key={key} className={"self-center"}>
                <Spinner className={"w-4 h-4"} />
              </animated.div>
            )
        )}
      </button>
    </Ripples>
  );
};
