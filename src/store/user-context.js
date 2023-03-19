import React from "react";

const UserContext = React.createContext({
  user: {},
  isLoggedIn: false,
  setUser: () => {},
  setLoggedIn: () => {},
});
export default UserContext;
