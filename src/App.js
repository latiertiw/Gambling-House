import React from "react";
import "./App.css";
import routes from "./routes/index.js";
import history from "./helpers/history";
import { Route, Switch, Router } from "react-router-dom";
import * as screens from "./components";

import SoundContext from "./stores/soundContext";

class App extends React.PureComponent {
  constructor(props) {
    super(props)

    this.toggleSound = () => {
      this.setState(state => ({
        on:
          state.on === false
            ? true
            : false,
      }));
    };

    this.state = {
      on: true,
      toggleSound: this.toggleSound,
    };
  }
  getRoutes() {
    return routes.mainRoutes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        component={route.route}
      />
    ));
  }

  render() {
    return (
      <>
        <SoundContext.Provider value={this.state}>
          <Router history={history}>
            <div className={"appContainer"}>
              <Switch>
                {this.getRoutes()}
                <Route component={screens.PageNotFound} />
              </Switch>
            </div>
          </Router>
        </SoundContext.Provider>
      </>
    );
  }
}

export default App;
