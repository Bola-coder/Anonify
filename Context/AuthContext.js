import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import UseToken from "../hooks/useToken";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { token, setToken } = UseToken();
  const router = useRouter();

  // Signup function
  const signup = (username, email, password) => {
    const content = JSON.stringify({
      username,
      email,
      password,
    });

    fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: content,
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        if (data.token) {
          setToken(data.token);
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      })
      .catch((err) => console.log("An Error occured during signup", err));
  };

  // Login function
  const login = (email, password) => {
    const credentials = JSON.stringify({
      email,
      password,
    });
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: credentials,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
        if (data.token) {
          setToken(data.token);
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      })
      .catch((err) => console.log("An error occured during login", err));
  };

  const checkAuthStatus = () => {
    if (token) {
      return true;
    }
    return false;
  };
  const values = {
    signup,
    login,
    token,
    user,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
