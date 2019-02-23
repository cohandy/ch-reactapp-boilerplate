import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";

class App extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </main>
    );
  }
}

export default App;
