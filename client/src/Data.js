import config from "./config";

export default class Data {
  api(
    path, // passed to axios
    method = "GET", // method in options
    body = null, // in options
    requiresAuth = false, // if true then add Authorization header
    credentials = null // used to build auth header base 64 encoded
  ) {
    // FIX THIS PROBLEM
    const url = `http://localhost:5000/api${path}`;
    console.log(config.apiBaseUrl);
    console.log("URL IS" + url);
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(username, password) {
    console.log("made it to get user");
    const response = await this.api("/users", "GET", null, true, {
      username,
      password,
    });
    console.log("Response is" + response);
    console.dir(response);
    return response;
  }

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
