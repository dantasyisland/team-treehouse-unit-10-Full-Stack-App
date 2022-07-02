import React, { Component, useEffect, useState, useContext } from "react";
import axios from "axios";
import Data from "./Data";

/**
 * Builds Authorization Header
 *
 * @param {string} username - Email address of user
 * @param {string} userpassword - User password.
 * @function
 */
export default function AxiosScratch() {
  const [apiURL, setapiURL] = useState(`http://localhost:5000/api/courses`);
  const [things, setThings] = useState({
    thingOne: 1,
    thingTwo: 2,
  });

  // write to catch error - color coded :-)
  useEffect(() => {
    console.log(`${apiURL}`);
    // console.log(data);

    (async () => {
      try {
        const data = await axios.get(`${apiURL}`, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        });
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [apiURL]);

  return (
    <div>
      axiosScratch
      {/* <Data /> */}
    </div>
  );
}
