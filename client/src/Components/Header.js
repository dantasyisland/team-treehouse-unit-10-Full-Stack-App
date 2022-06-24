import React from 'react';

export default function Header() {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <a href="/">Courses</a>
        </h1>
        <nav>
          {/* Going to change signed vs signed out class */}
          <ul className="header--signedout">
            <li>
              <a href="sign-up.html">Sign Up</a>
            </li>
            <li>
              <a href="sign-in.html">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
