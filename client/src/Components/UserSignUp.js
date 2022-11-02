import React, { Component } from "react";
import Form from "./Form";

export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    errors: [],
  };

  submit = () => {
    const { context } = this.props;
    const { firstName, lastName, emailAddress, password } = this.state;
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    context.data.createUser(user).then((errors) => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        context.actions.signIn(emailAddress, password).then(() => {
          this.props.history.push("/");
        });
      }
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
    const { firstName, lastName, emailAddress, password, errors } = this.state;
    return (
      <Form
        headerText={"Sign Up"}
        submit={this.submit}
        submitButtonText="Sign Up!"
        cancel={this.cancel}
        errors={errors}
        elements={
          <>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={this.change}
              placeholder="First Name"
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={this.change}
              placeholder="Last Name"
            />
            <input
              id="emailAddress"
              name="emailAddress"
              type="text"
              value={emailAddress}
              onChange={this.change}
              placeholder="Email Address"
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
