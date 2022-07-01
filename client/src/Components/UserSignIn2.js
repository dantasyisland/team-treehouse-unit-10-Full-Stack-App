import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserSignIn extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: "joe@smith.com",
    password: "joepassword",
    errors: [],
  };

  componentDidMount() {
    const dannyRun = () => this.props.context.actions.danny;
    dannyRun();
    console.log("this");
    sign(this.state.username, this.state.password);
  }

  render() {
    const { username, password, errors } = this.state;
    return <p>hi</p>;
  }
}
