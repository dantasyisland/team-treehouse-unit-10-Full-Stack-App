import React from "react";
import { Link } from "react-router-dom";

// HOW DO I DESTRUCTURE DEEPER

export default function Header(props) {
  const { authenticatedUser } = props.context;

  console.log(authenticatedUser);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authenticatedUser ? (
            <ul className="header--signedin">
              <li>Welcome you are signed in</li>{" "}
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
