import React from "react";
import { Switch, Route } from "react-router-dom";
import { pageConfig } from "pages";
import { ReactComponent as AppLogo } from "resources/WhiskLogo.svg";

function App() {
  return (
    <>
      <div className={"mx-auto flex items-center"}>
        <AppLogo
          className={
            "w-12 h-12 text-gray-800 stroke-2 stroke-current fill-current"
          }
        />

        <h1 className={"text-center text-4xl ml-4"}>Whisky Business</h1>
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
    </>
  );
}

export default App;
