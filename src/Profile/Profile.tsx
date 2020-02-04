import React, { FunctionComponent } from "react";
import { RouteChildrenProps } from "react-router-dom";

const { REACT_APP_API_KEY } = process.env;

interface ProfileProps extends RouteChildrenProps {
  token?: string;
}

interface State2 {
  name: string;
  profiles: {
    avatarHash: string;
    fullName?: string;
    email?: string;
    userName?: string;
    url?: string;
  };
}

export class Profile extends React.Component<ProfileProps, State2> {
  public state: State2 = {
    name: "",
    profiles: { avatarHash: "" }
  };
  private renderProfile() {
    const url = this.state.profiles.url;
    return (
      <div>
        <img
          className="avatar_height"
          src={`https://trello-avatars.s3.amazonaws.com/${
            this.state.profiles.avatarHash
          }/${170}.png`}
        ></img>
        <div>{this.state.profiles.fullName}</div>
        <div>{this.state.profiles.email}</div>
        <div>{this.state.profiles.userName}</div>
        <a href={url}> Go to Trello Page</a>
      </div>
    );
  }

  private requestUrl = () => {
    fetch(
      `https://api.trello.com/1/members/me?fields=all&key=${REACT_APP_API_KEY}&token=${this.props.token}`
    )
      .then(it => it.json())
      .then(it => this.setState({ profiles: it }));
    console.log(this.state.profiles);
    console.log("done!");
  };

  render() {
    return (
      <div className="user_info" onClick={this.requestUrl}>
        Your Profile
        <div>
          {this.state.profiles.avatarHash !== ""
            ? this.renderProfile()
            : "Loading"}
        </div>
      </div>
    );
  }
}
