import React from "react";
import { Switch, Route } from "react-router-dom";
import { pageConfig } from "pages";

function App() {
  return (
    <>
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
