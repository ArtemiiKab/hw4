import React, { FunctionComponent } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  children?: any;
  isAuthenticated: boolean;
}

export const ProtectedRoute: FunctionComponent<PrivateRouteProps> = ({
  render,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(routeCompProps: RouteComponentProps) =>
        isAuthenticated ? (
          render!(routeCompProps)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeCompProps.location }
            }}
          />
        )
      }
    />
  );
};
