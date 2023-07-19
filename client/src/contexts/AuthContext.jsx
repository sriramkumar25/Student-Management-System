import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();
  const value = {
    currentUser,
    userType,
    setUserType,
    login,
  };
  useEffect(() => {
    axios
      .get("/login")
      .then((response) => {
        console.log(response.data);
        setCurrentUser(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  function login(input, cb) {
    axios
      .post(
        `${userType}/login`,
        { ...input, userType },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setCurrentUser(response.data);
        console.log("Current user set successfully");
        cb();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
