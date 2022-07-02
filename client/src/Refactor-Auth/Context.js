import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const MyContext = React.createContext();

export class Context extends Component {
  constructor() {
    super();
    this.cookie = Cookies.get("authenticatedUser");
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    };

    this.data = new Data();
  }

  // signIn

  // signOut

  // getCourses

  // getUser

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      // actions
    };
    return (
      <MyContext.Provider value={value}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
