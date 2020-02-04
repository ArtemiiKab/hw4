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
import { Login } from "./Login";
import { routes, AppRoute } from "./routes";
import { OAuth } from "./OAuth";
import { Profile } from "./Profile";
import "./App.css";

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
            <Link className="link_padding" key={index} to={route.path}></Link>
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
          <Route
            path="/dashboard"
            render={props => <Dashboard {...props} token={this.state.token} />}
          />
          <Route
            path="/profile"
            render={props => <Profile {...props} token={this.state.token} />}
          />
          <Redirect to="/404" />
        </Switch>
      </main>
    );
  }

  public render() {
    return (
      <div className="header_and_content">
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}
