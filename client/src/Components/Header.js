import React from "react";
import { Link } from "react-router-dom";

// HOW DO I DESTRUCTURE DEEPER

export default function Header({ context: { authenticatedUser } }) {
  console.log(
    "%c From Header - authenticatedUser is: ",
    "color:blue;font-size:16px "
  );
  console.log(authenticatedUser);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authenticatedUser ? <p>Yes</p> : <p>No</p>}
          <ul className="header--signedout">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
