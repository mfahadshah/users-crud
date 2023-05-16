import React from "react";
import AuthService from "./Components/auth/AuthService";
import { Redirect } from "react-router-dom";

const Auth = new AuthService();

class ProtectedRoute extends React.Component {
  render() {
    const props = this.props;
    const Component = this.props.component;
    const isAuthenticated = Auth.loggedIn();

    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}

export default ProtectedRoute;
