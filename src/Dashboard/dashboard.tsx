import React, { FunctionComponent } from "react";
import { RouteChildrenProps } from "react-router-dom";
const { REACT_APP_API_KEY } = process.env;

interface DashboardProps extends RouteChildrenProps {
  hello?: string;
  token?: string;
}
/*
export const Dashboard: FunctionComponent<DashboardProps> = ({
  token,
  ...rest
}) => {
  const [data, getData] = React.useState([]);

  const getBoards = () => {
    fetch(
      `https://api.trello.com/1/members/artemiikabanov/boards?key=${REACT_APP_API_KEY}&token=${token}`
    )
      .then(res => res.json())
      .then(json => getData(json));
  };
  console.log(data);

  return (
    <div>
      <div>Dashboard</div>
      <button onClick={getBoards}>Show Boards</button>
      {data.length !== 0 && data.map((boards, index) => <div>{}</div>)}
    </div>
  );
};

*/

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
      </div>
    );
  }
}
