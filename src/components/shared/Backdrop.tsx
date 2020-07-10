import React from "react";
import clsx from "clsx";

export interface BackdropProps {
  className?: string;
  onClick?: () => void;
}

export const Backdrop: React.FC<BackdropProps> = (props) => {
  const { children, onClick, className } = props;
  const handleClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.preventDefault();
    evt.stopPropagation();
    onClick && onClick();
  };
  return (
    <div
      className={clsx(
        className,
        "fixed top-0 left-0 right-0 bottom-0 z-50 overflow-auto bg-smoke-light grid items-center"
      )}
      onClick={handleClick}
    >
      <div onClick={handleClick} className={"flex justify-center"}>
        {children}
      </div>
    </div>
  );
};
