import React from "react";

export interface FormSectionProps {
  title: string;
  description?: string;
}

export const FormSection: React.FC<FormSectionProps> = (props) => {
  const { children, title, description } = props;

  return (
    <div className={"flex flex-col w-full py-6"}>
      <div className={"flex flex-col md:hidden"}>
        <span className={"text-lg font-semibold"}>{title}</span>
        {description && (
          <span className={"text-gray-700 py-2"}>{description}</span>
        )}
      </div>
      <hr className={"border-gray-500"} />
      <div className={"flex w-full"}>
        <div className={"hidden md:flex flex-col w-1/3 pt-4 md:pr-1"}>
          <span className={"text-lg font-semibold"}>{title}</span>
          {description && (
            <span className={"text-gray-700 py-2"}>{description}</span>
          )}
        </div>
        <div className={"w-full md:w-2/3 md:pl-1"}>{children}</div>
      </div>
    </div>
  );
};
