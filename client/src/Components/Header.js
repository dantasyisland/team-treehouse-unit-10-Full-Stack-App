import React from "react";
import { Link } from "react-router-dom";

export default function Header({ context: { authenticatedUser } }) {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authenticatedUser ? (
            <>
              <ul className="header--signedin">
                <li>
                  <span>{`Welcome, ${authenticatedUser.user.firstName} ${authenticatedUser.user.lastName}! `}</span>
                  <Link to="/signOut">Sign Out</Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="header--signedout">
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </ul>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
