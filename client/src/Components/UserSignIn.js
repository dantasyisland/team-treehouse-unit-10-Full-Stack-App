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
          // THE CONDITION BELOW IS NOT BEING MET THIS IS WHY IT'S BEING PUSH TO ERROR
          // user is null??? - check context and state
          // Need to access from CONTEXT not the returned user in signIn - look at signup too
        } else {
          if (!this.props.location.state.from.pathname) {
            this.props.history.push("/");
            console.log(user);
          }
          console.log(this.props.location.state.from.pathname);
          this.props.history.push(this.props.location.state.from.pathname);
          console.log(context);
          console.log(user);
        }
      })
      .catch((err) => {
        console.log(context);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    const { history } = this.props;
    history.push("/");
  };

  // Handles state
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
