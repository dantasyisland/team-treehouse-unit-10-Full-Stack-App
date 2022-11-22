import React from "react";

export default function Error(props) {
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
