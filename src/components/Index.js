import React from "react";
import { useStoreContext } from "../lib/hooks/useStoreContext";
import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";

function Index() {
  const { user } = useStoreContext();

  return user ? user.role === "admin" ? <Admin /> : <Home /> : <Login />;
}

export default Index;
