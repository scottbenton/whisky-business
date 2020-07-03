import React from "react";
import clsx from "clsx";

const DEFAULT_ELEMENT = "div";

export interface CardProps {
  className?: string;
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  tabIndex?: number;
  onClick?: () => void;
  "data-testid"?: string;
}

export const Card: React.FC<CardProps> = (props) => {
  const {
    className,
    children,
    component: Component = DEFAULT_ELEMENT,
    tabIndex,
    onClick,
    "data-testid": testId,
  } = props;

  const handleClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.preventDefault();
    evt.currentTarget.blur();
    typeof onClick === "function" && onClick();
  };

  return (
    <Component
      className={clsx(
        "bg-white text-gray-900 shadow-md rounded-lg overflow-hidden border-t-4 border-green-400",
        className
      )}
      tabIndex={tabIndex}
      onClick={handleClick}
      data-testid={testId}
    >
      {children}
    </Component>
  );
};
