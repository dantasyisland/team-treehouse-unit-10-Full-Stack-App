import React, { useState, useContext } from "react";

import axiosScratch from "./axiosScratch";

import "../styles/reset.css";
import "./refactor.css";
import AxiosScratch from "./axiosScratch";

export default function AppScratch() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      <div className="wrap header--flex">
        <header>
          <h1 className="header--logo">HI THIS IS THE HEADER</h1>
        </header>
      </div>
      <div className="wrap main--grid">
        <main>
          <h1>Welcome</h1>
          <h2>Impact</h2>
          <p>Some text</p>
          <AxiosScratch />
        </main>
      </div>
    </>
  );
}
