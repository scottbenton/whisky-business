import React from "react";
import { Link } from "react-router-dom";
import { pageConfig } from "pages";
import { useAuth } from "providers/AuthProvider";
import { NavLink } from "./NavLink";

import { ReactComponent as WhiskLogo } from "resources/WhiskLogo.svg";

export const NavBar: React.FC = (props) => {
  const { user } = useAuth();

  const navItems = Object.values(pageConfig).filter(
    (page) =>
      page.label &&
      (user ? !page.hideWhenAuthenticated : !page.hideWhenUnauthenticated)
  );

  return (
    <>
      <div className={"px-2 bg-white text-gray-900 shadow-xl"}>
        {/* <div className={"px-2 py-3 text-gray-900 flex justify-between items-center max-w-screen-xl mx-auto w-full"}> */}
        <div
          className={
            "flex justify-between items-center max-w-screen-xl mx-auto w-full h-full"
          }
        >
          <Link
            className={
              "text-center text-primary-dark text-3xl font-title font-bold hover:underline px-2 flex items-center"
            }
            to={pageConfig.home.path}
          >
            <WhiskLogo className={"stroke-current text-primary w-8 h-8"} />
            <span className={"ml-2"}>Whisky Business</span>
          </Link>
          <div className={"flex h-full"}>
            {navItems.map((navItem) => (
              <NavLink key={navItem.label} path={navItem.path}>
                {navItem.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
