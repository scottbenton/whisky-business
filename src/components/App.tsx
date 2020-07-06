import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { pageConfig } from "pages";
import { ReactComponent as AppLogo } from "resources/WhiskLogo.svg";
import { useAuth } from "providers/AuthProvider";
import { Button } from "./shared/Button";

function App() {
  const { user, signOut } = useAuth();
  const history = useHistory();
  return (
    <>
      <div className={"flex justify-between items-center px-4 py-2"}>
        <div className={"flex items-center"}>
          <AppLogo
            className={
              "w-12 h-12 text-gray-800 stroke-2 stroke-current fill-current"
            }
          />

          <h1 className={"text-center text-5xl ml-4 font-title"}>
            Whisky Business
          </h1>
        </div>
        {user ? (
          <div
            style={{
              backgroundColor: user.getHSL(70, 80),
              color: user.getHSL(80, 20),
              borderColor: user.getHSL(80, 40),
            }}
            className={
              "w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold border-2"
            }
          >
            {user.getInitials()}
          </div>
        ) : (
          <Button
            id={"log-in"}
            variant={"secondary"}
            onClick={() => history.push(pageConfig.signIn.path)}
          >
            Log In
          </Button>
        )}
      </div>
      <Switch>
        {Object.values(pageConfig).map((page, index) => {
          const { component, path, exact } = page;
          return (
            <Route
              key={index}
              component={component}
              path={path}
              exact={exact}
            />
          );
        })}
      </Switch>
      <div className={"flex justify-end bg-white px-4 py-2 mt-8"}>
        {user && (
          <Button id={"log-out"} variant={"tertiary"} onClick={() => signOut()}>
            Log Out
          </Button>
        )}
      </div>
    </>
  );
}

export default App;
