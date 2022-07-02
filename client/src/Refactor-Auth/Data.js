import config from "../config";

import React, { Component } from "react";

export default class Data extends Component {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = `${config}${path}`;
    console.log("api method url: " + url);
  }

  logApiURL = () => {
    this.api();
    console.log(
      `%capiBaseUrl ${config}`,
      "color: #a95aff; text-transform:uppercase; font-size: 20px;"
    );
  };

  render() {
    this.api("/users");
    return (
      <>
        <p>Fix this in a few</p>
      </>
    );
  }
}
