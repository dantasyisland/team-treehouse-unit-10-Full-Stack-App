import React, { Component } from "react";

export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  };

  // context.actions is the key - in this case create user
  // which uses methods from the data class
  // context is being sent as a prop
  // The provider and consumer are in Context.js
  // authenticatedUser with cookie is handled in context as well

  /*** I need to:
      1. Create a createUser method in the Data class
      2. Setup an asynchronous function which takes firstName, lastName, emailAddress and Password. emailAddress is username
      3. If I get a userCreated I can give the user a cookie in createAccount which will be in context
  ***/

  render() {
    return <div>UserSignUp</div>;
  }
}
