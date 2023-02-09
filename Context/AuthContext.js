import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import UseToken from "../hooks/useToken";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { token, setToken } = UseToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  // const apiLink = process.env.REACT_APP_ANONIFY_API;
  const apiLink = "https://anonify-backend.onrender.com";

  // Signup function
  const signup = (username, email, password) => {
    const content = JSON.stringify({
      username,
      email,
      password,
    });
    setLoading(true);
    // fetch(`${apiLink}/user/signup`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: content,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUser(data.user);
    //     localStorage.setItem("user", JSON.stringify(data.user));
    //     if (data.token) {
    //       setToken(data.token);
    //       router.push("/profile");
    //       setLoading(false);
    //     } else {
    //       router.push("/");
    //       setLoading(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("An Error occured during signup", err);
    //     setLoading(true);
    //   });
    axios
      .post(`${apiLink}/user/signup`, {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        data.user ? setUser(data.user) : "";
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          setToken(data.token);
          router.push("/profile");
          setLoading(false);
        } else {
          router.push("/");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("An error occured during sign in", err);
      });
  };

  // Login function
  const login = (email, password) => {
    const credentials = JSON.stringify({
      email,
      password,
    });
    setLoading(true);
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
        data.user ? setUser(data) : "";
        localStorage.setItem("user", JSON.stringify(data));
        if (data.token) {
          setToken(data.token);
          router.push("/profile");
          setLoading(false);
        } else {
          router.push("/");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("An error occured during login", err);
        setLoading(false);
      });
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    alert("Logout successful");
    router.push("/");
    setToken(null);
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
    loading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
