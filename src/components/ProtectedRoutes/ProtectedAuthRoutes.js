import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedAuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (props.location.state === undefined) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component />;
        }
      }}
    />
  );
};

export default ProtectedAuthRoute;
