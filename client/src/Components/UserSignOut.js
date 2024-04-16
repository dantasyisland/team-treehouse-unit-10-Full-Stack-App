import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// Component for signing out a user and redirecting them to the home page
export default function UserSignOut({ context }) {
  useEffect(() => context.actions.signOut());
  return <Redirect to="/" />;
}
