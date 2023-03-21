import React, { useState } from "react";
import UserContext from "./user-context";

function UserProvider(props) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setUserHandler = (user) => {
    setUser(user);
  };
  const isLoggedInHandler = (status) => {
    setIsLoggedIn(status);
    if (status === false) {
      setUser({});
    }
  };
  const userContext = {
    user,
    isLoggedIn,
    setUser: setUserHandler,
    setLoggedIn: isLoggedInHandler,
  };
  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
