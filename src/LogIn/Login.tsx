import * as React from "react";
const {
  REACT_APP_API_KEY,
  REACT_APP_APP_NAME,
  REACT_APP_REDIRECT_URL,
  REACT_APP_SCOPE
} = process.env;

export class Login extends React.Component {
  render() {
    const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;

    return (
      <div>
        <a href={requestUrl}>Login with Trello account</a>
        <h2>Please Log In</h2>
      </div>
    );
  }
}
