import React, { FunctionComponent } from "react";
import { RouteChildrenProps } from "react-router-dom";
import { Profile } from "../Profile";
const { REACT_APP_API_KEY } = process.env;

interface DashboardProps extends RouteChildrenProps {
  hello?: string;
  token?: string;
}

interface State {
  name: string;
  boards: Array<{ name: string }>;
}
export class Dashboard extends React.Component<DashboardProps, State> {
  public state: State = {
    name: "",
    boards: []
  };

  private goBack = () => {
    this.props.history.goBack();
  };

  private requestUrl = () => {
    fetch(
      `https://api.trello.com/1/members/me/boards?&key=${REACT_APP_API_KEY}&token=${this.props.token}`
    )
      .then(it => it.json())
      .then(it => this.setState({ boards: it }));
    console.log(this.state.boards);
  };

  renderBoards() {
    return this.state.boards.map(board => (
      <div className="board_background">{board.name}</div>
    ));
  }

  render() {
    return (
      <div>
        <h2 onClick={this.goBack}>Go back from Dashboard</h2>
        <div className="btn_center" onClick={this.requestUrl}>
          Show boards
        </div>
        <div className="board_flex-row">
          {this.state.boards.length > 0 ? this.renderBoards() : "Loading"}
        </div>
        <Profile {...this.props}></Profile>
      </div>
    );
  }
}
