import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "../../Data";

const AppContext = React.createContext();

export class Context extends Component {
  constructor() {
    super();
    this.cookie = Cookies.get("authenticatedUser");
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    };

    this.data = new Data();
  }

  state = {
    authenticatedUser: null,
  };

  signIn = async (username, password) => {
    //this.data data object from Data.js
    const user = await this.data.getUser(username, password);
    // if user - set state to user for authenticatedUser
    console.log("%c From Context.js:", "color:blue");
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      user.user.password = password;

      // Set cookie - 1st name of user second is the value to store in the cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
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
    console.log("clicked");
    console.log(course);
    const courseToUpdate = await this.data.updateCourse(
      course,
      username,
      password
    );

    return courseToUpdate;
  };

  signUp = async (firstName, lastName, emailAddress, password) => {
    // will return a response an empty array is successful from Data.js
    // still stringify the user
    // set State for authenticatedUser
    const userInfo = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    const user = await this.data.createUser(userInfo);
    if (user !== null) {
      console.log("did it");
      console.log(user);
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
    }
  };

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove("authenticatedUser");
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
      },
    };
    return (
      // Hello comment
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <AppContext.Consumer>
        {(context) => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
}
