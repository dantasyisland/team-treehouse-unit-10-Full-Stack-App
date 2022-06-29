import React from "react";
import { Link } from "react-router-dom";

// HOW DO I DESTRUCTURE DEEPER

export default function Header({ context: { authenticatedUser } }) {
  console.log(authenticatedUser);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {/* Going to change signed vs signed out class */}
          {/* If signed in <ul class="header--signedin">
              <li>Welcome, Joe Smith!</li>
              <li><Link to="/signout'>Sign Out</Link></li>
            </ul> */}
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
