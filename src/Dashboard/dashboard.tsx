import * as React from "react";
import { RouteChildrenProps } from "react-router-dom";

interface DashboardProps extends RouteChildrenProps {
  hello?: string;
  token?: string;
}
export class Dashboard extends React.Component<DashboardProps> {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return <h2 onClick={this.goBack}>Go back from Dashboard</h2>;
  }
}
