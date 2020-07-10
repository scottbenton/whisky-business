import React from "react";
import { Switch, Route } from "react-router-dom";
import { pageConfig } from "pages";
import { NavBar } from "./shared/navigation/NavBar";
import { Content } from "./shared/navigation/Content";
import { Footer } from "./shared/navigation/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Content>
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
      </Content>
      <Footer />
    </>
  );
}

export default App;
