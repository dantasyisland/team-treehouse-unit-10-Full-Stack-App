import React from "react";

// Component that will be rendered by React Router for URLs that do not exist.
export default function NotFound() {
  return (
    <main>
      <div className="wrap">
        <h2>Not Found</h2>
        <p>Sorry! We couldn't find the page you're looking for.</p>
      </div>
    </main>
  );
}
