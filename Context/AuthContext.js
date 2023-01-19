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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  // const apiLink = process.env.REACT_APP_ANONIFY_API;
  const apiLink = "http://localhost:5000";

  // Signup function
  const signup = (username, email, password) => {
    const content = JSON.stringify({
      username,
      email,
      password,
    });

    fetch(`${apiLink}/user/signup`, {
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
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          setToken(data.token);
          router.push("/profile");
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
    fetch(`${apiLink}/user/login`, {
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
        localStorage.setItem("user", JSON.stringify(data));
        if (data.token) {
          setToken(data.token);
          router.push("/profile");
        } else {
          router.push("/");
        }
      })
      .catch((err) => console.log("An error occured during login", err));
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setToken(null);
    alert("Logout successful");
    router.push("/");
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
    logout,
    token,
    user,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
