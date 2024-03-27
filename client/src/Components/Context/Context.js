import React, { Component, createContext } from "react";
import Cookies from "js-cookie";
import Data from "../../Data";

// Create context object
const AppContext = createContext();

// Class component for managing state and providing context data to child components
export class Context extends Component {
  constructor() {
    super();
    this.cookie = Cookies.get("authenticatedUser");
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    };

    this.data = new Data();
  }
  // Asynchronous methods to perform operations on data and handle user sign in and sign out
  signUp = async (firstName, lastName, emailAddress, password) => {
    const userInfo = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    const user = await this.data.createUser(userInfo);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
    }
  };

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);

    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      user.user.password = password;

      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove("authenticatedUser");
  };

  createCourse = async (course, username, password) => {
    const courseToCreate = await this.data.createCourse(
      course,
      username,
      password
    );
    return courseToCreate;
  };

  updateCourse = async (course, username, password) => {
    const courseToUpdate = await this.data.updateCourse(
      course,
      username,
      password
    );

    return courseToUpdate;
  };

  deleteCourse = async (course, username, password) => {
    const courseToDelete = await this.data.deleteCourse(
      course,
      username,
      password
    );
    if (courseToDelete !== null) {
      return courseToDelete;
    }
  };

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse,
      },
    };
    // Will be wrapped around App component to provide context throughout entire application
    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const Consumer = AppContext.Consumer;

// HOC to wrap a consumer component and render with context data
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <AppContext.Consumer>
        {(context) => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
}
