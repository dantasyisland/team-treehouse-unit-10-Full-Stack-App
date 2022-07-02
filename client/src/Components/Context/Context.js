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
  // state = {
  //   authenticatedUser: null,
  // };
  // SETS TO NULL
  state = {
    authenticatedUser: null,
  };

  danny = () => {
    console.log("ram");
  };

  signIn = async (username, password) => {
    console.log("made it");
    //this.data data object from Data.js
    const user = await this.data.getUser(username, password);
    console.log("User is: " + user);

    // if user - set state to user for authenticatedUser
    console.dir(user);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      console.log(JSON.stringify);
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      // Set cookie - 1st name of user second is the value to store in the cookie
      // Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
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
  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
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
