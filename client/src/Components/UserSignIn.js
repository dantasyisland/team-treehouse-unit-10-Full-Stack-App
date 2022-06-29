import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserSignIn extends Component {
  state = {
    username: "",
    password: "",
    errors: [],
  };

  render() {
    const { username, password, errors } = this.state;
    return <p>Hi</p>;
  }
}
