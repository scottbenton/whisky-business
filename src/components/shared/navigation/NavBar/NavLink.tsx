import React, { MouseEvent } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import clsx from "clsx";
import Ripples from "react-ripples";
export interface NavLinkProps {
  className?: string;
  path: string;
}
export const NavLink: React.FC<NavLinkProps> = (props) => {
  const { className, children, path } = props;

  const match = useRouteMatch({ path: path });

  return (
    <Ripples>
      <Link
        onClick={(evt: MouseEvent<HTMLAnchorElement>) =>
          evt.currentTarget.blur()
        }
        className={clsx(
          "btn btn-default-text py-4 h-full border-0 border-b-4 border-transparent rounded-none",
          !!match ? " border-primary focus:border-primary-darker" : "",
          className
        )}
        to={path}
      >
        {children}
      </Link>
    </Ripples>
  );
};
