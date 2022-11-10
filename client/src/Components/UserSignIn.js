import React, { Component } from "react";
import Form from "./Form";

export default class UserSignIn extends Component {
  state = {
    username: "",
    password: "",
    errors: [],
  };

  submit = () => {
    const { context } = this.props;

    const { username, password } = this.state;

    context.actions
      .signIn(username, password)
      .then((user) => {
        // signin not successful
        if (user == null) {
          this.setState(() => {
            return {
              errors: ["Sign-In was unsuccessful"],
            };
          });
        } else {
          if (this.props.location.state.prevPath === "/signin") {
            this.props.history.push("/");
          } else {
            this.props.history.push(this.props.location.state.prevPath);
          }
        }
      })
      .catch((err) => {
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    const { history } = this.props;
    history.push("/");
  };

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  render() {
    const { username, password, errors } = this.state;

    return (
      <Form
        headerText={"Sign In"}
        className={"form--centered"}
        submit={this.submit}
        submitButtonText="Sign In"
        errors={errors}
        cancel={this.cancel}
        elements={
          <>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={this.change}
              placeholder="User Name"
            />
            <input
              id="password"
              name="password"
              type="text"
              value={password}
              onChange={this.change}
              placeholder="Password"
            />
          </>
        }
      />
    );
  }
}
