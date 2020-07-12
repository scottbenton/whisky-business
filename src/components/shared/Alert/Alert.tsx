import React from "react";
import clsx from "clsx";

export interface AlertProps {
  title?: string;
  message: string;
  actions?: React.ReactElement;
  type?: "info" | "warning" | "error" | "success";
  className?: string;
}

export const Alert: React.FC<AlertProps> = (props) => {
  const { title, message, actions, type, className: overWriteClasses } = props;

  let className = clsx(
    overWriteClasses,
    "w-full flex flex-wrap px-4 py-2 rounded-lg"
  );

  switch (type) {
    case "info": {
      className = clsx(
        className,
        "bg-blue-100 border-2 border-blue-500 text-blue-700"
      );
      break;
    }
    case "warning": {
      className = clsx(
        className,
        "bg-yellow-100 border-2 border-yellow-500 text-yellow-800"
      );
      break;
    }
    case "error": {
      className = clsx(
        className,
        "bg-red-100 border-2 border-red-500 text-red-700"
      );
      break;
    }
    case "success": {
      className = clsx(
        className,
        "bg-green-100 border-2 border-green-500 text-green-800"
      );
      break;
    }
    default: {
      className = clsx(
        className,
        "bg-gray-100 border-2 border-gray-500 text-gray-700"
      );
    }
  }

  return (
    <div className={className}>
      <div className={"flex flex-col"}>
        <span className={"text-lg font-semibold"}>{title}</span>
        <span>{message}</span>
      </div>
      {actions}
    </div>
  );
};
