import React from "react";
import { User } from "react-zondicons";
import { UserDTO } from "classes/dto/UserDTO";
import clsx from "clsx";

export interface AvatarProps {
  user?: UserDTO;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { user } = props;
  const baseClasses =
    "rounded-full w-12 h-12 flex items-center justify-center border-2 text-lg font-semibold tracking-wider";

  if (user) {
    return (
      <div
        className={baseClasses}
        style={{
          backgroundColor: user.getHSL(70, 80),
          color: user.getHSL(80, 20),
          borderColor: user.getHSL(80, 40),
        }}
      >
        {user.getInitials()}
      </div>
    );
  } else {
    return (
      <div className={clsx(baseClasses, "bg-gray-500")}>
        <User data-testid={"blank-svg"} className={"text-white fill-current"} />
      </div>
    );
  }
};
