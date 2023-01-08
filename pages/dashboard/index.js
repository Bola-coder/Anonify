import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../Context/AuthContext";

const Dashboard = () => {
  const { user, checkAuthStatus, token } = useAuth();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState(null);
  const messageURI = "http://localhost:5000/messages";

  useLayoutEffect(() => {
    checkAuthStatus() ? "" : router.push("/");
    if (typeof window !== "undefined") {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [checkAuthStatus, router]);
  console.log(user);

  const getCurrentUserMessages = () => {
    console.log("hello");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    fetch(messageURI, {
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessages(data.status);
        console.log("User messages", messages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCurrentUserMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section>
      <h2> {currentUser?.username}&apos;s Message Dashboard</h2>
      <h2>Welcome to the dashboard component</h2>
    </section>
  );
};

export default Dashboard;
