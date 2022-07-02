import config from "../config";

import React, { Component } from "react";
import axios from "axios";
import AxiosScratch from "./axiosScratch";

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

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    // Course Data
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    // console.dir(options);
    return axios(url, options);
  }

  logApiURL = () => {
    this.api();
    console.log(
      `%capiBaseUrl ${config}`,
      "color: #a95aff; text-transform:uppercase; font-size: 20px;"
    );
  };

  async getCourses() {
    const courses = await this.api("/courses");
    // console.log(courses);
  }

  async getUser(username, password) {
    const user = await this.api("/users", "GET", null, true, {
      username,
      password,
    });
    if (user) {
      console.log(JSON.stringify(user.data, undefined, 2));
    }
    return user.data;
  }

  componentDidMount() {
    // this.logApiURL();
    // this.getCourses();
    // this.getUser(`joe@smith.com`, `joepassword`);
  }

  render() {
    return (
      <>
        <p>Fix this in a few</p>
      </>
    );
  }
}
