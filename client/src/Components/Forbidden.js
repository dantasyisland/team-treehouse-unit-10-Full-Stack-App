import React, { useSyncExternalStore } from "react";

export default function Forbidden({
  context: {
    authenticatedUser: { user },
  },
}) {
  console.log(user);
  return (
    <div>
      <h1>
        Sorry {user.emailAddress} but you do not have access to this course
      </h1>{" "}
    </div>
  );
}
