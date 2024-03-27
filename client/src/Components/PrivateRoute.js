import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context/Context"; // Destructure Consumer component from Context

// A private route function that takes a component as argument and will render that component only is user is authenticated
export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { prevPath: props.location },
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
}
