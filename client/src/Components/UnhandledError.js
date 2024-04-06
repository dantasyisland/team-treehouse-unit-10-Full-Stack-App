import React from "react";

// Component that will be rendered by React Router for handling any unhandled errors.
export default function UnhandledError(props) {
  const { error } = props.location.state;

  return (
    <main>
      <div className="wrap">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    </main>
  );
}
