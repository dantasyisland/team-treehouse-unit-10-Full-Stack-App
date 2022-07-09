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
    console.log(user);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      // Set cookie - 1st name of user second is the value to store in the cookie
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
