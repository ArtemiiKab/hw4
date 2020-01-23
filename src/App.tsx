import React from "react";
import {
  Route,
  Link,
  RouteChildrenProps,
  Redirect,
  Switch
} from "react-router-dom";
import { setToLocalStorage, getFromLocalStorage } from "./utils";
import { Dashboard } from "./Dashboard";
import { Login } from "./LogIn";
import { routes, AppRoute } from "./routes";
import { OAuth } from "./OAuth";

const TOKEN_STORAGE_KEY = "TOKEN";

interface Board {
  id: string;
  name: string;
  desc?: string;
  pinned: boolean;
}

interface AppState {
  token: string;
  boards: Array<Board>;
}

export class App extends React.Component<any, AppState> {
  public state = {
    token: "",
    boards: []
  };

  private setToken = (token: string) => {
    this.setState({ token });
  };

  private isLoggedIn() {
    return !!this.state.token;
  }

  private renderHeader() {
    return (
      <header>
        {routes.map((route: AppRoute, index: number) =>
          route.isHidden ? null : (
            <Link key={index} to={route.path}>
              {route.title}
            </Link>
          )
        )}
      </header>
    );
  }

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map((route: any, index: number) => (
            <Route
              exact
              key={index}
              path={route.path}
              render={props => route.render({ ...props })}
            ></Route>
          ))}
          <Route
            path="/oauth"
            render={(props: RouteChildrenProps) => (
              <OAuth {...props} onSetToken={this.setToken} />
            )}
          />
          <Redirect to="/404" />
        </Switch>
      </main>
    );
  }

  public render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}
