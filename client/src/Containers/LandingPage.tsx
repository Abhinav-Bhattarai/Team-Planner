import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";

interface PROPS {
  ChangeAuthentication: (type: boolean) => void;
}

const LandingPage: React.FC<PROPS> = props => {
  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <h1></h1>;
          }}
        />

        <Route
          exact
          path="/login"
          render={() => {
            return <h1></h1>;
          }}
        />

        <Route
          exact
          path="/signup"
          render={() => {
            return <h1></h1>;
          }}
        />
        
        <Route
            render={() => {
                return <h1></h1>
            }}
        />
    
      </Switch>
    </React.Fragment>
  );
};

export default LandingPage;
