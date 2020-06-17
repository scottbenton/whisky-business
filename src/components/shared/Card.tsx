import React from "react";
import clsx from "clsx";

interface CardProps {
  className?: string;
}

export const Card: React.FC<CardProps> = (props) => {
  const { className, children } = props;
  return (
    <div
      className={clsx(
        "bg-white text-gray-900 shadow-md rounded-lg overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};
