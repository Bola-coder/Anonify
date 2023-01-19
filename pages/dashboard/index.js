import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../../Components/Navbar";
import styles from "./../../styles/Dashboard.module.css";

const Dashboard = () => {
  const { user, checkAuthStatus, token } = useAuth();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState(null);
  // const apiLink = process.env.REACT_APP_ANONIFY_API;
  const apiLink = "http://localhost:5000";
  const messageURI = `${apiLink}/messages/`;

  // UseEffect to get token and user
  useLayoutEffect(() => {
    checkAuthStatus() ? "" : router.push("/");
    if (typeof window !== "undefined") {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [checkAuthStatus, router]);
  console.log(user);

  // Function to get currently logged in user's message
  const getCurrentUserMessages = () => {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    fetch(messageURI, {
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMessages(data.data);
        console.log("User messages", messages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCurrentUserMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {" "}
      <Navbar />
      <section className={styles.dashboard}>
        <h2 className={styles.dashboard__header}>
          {" "}
          {currentUser?.username}&apos;s Message Dashboard
        </h2>
        {/* <div className={styles.contents}> */}
        {messages
          ? messages.map((message, index) => (
              <div key={index} className={styles.content}>
                <p>Message:</p>
                <p>{message.messageContent}</p>
                <p>-Anonify {message.timeSent}</p>
                <div className={styles.content__button}>
                  <button>Share message</button>
                  <button>Archive message</button>
                </div>
              </div>
            ))
          : ""}
        {/* </div> */}
      </section>
    </>
  );
};

export default Dashboard;
