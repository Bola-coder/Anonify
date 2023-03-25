import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../../Components/Navbar";
import styles from "./../../styles/Dashboard.module.css";
import ShareComponent from "../../Components/ShareComponent";

// const DynamicNavbar = dynamic(() => import("../../Components/Navbar"));

const Dashboard = () => {
  const { checkAuthStatus, token } = useAuth();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [share, setShare] = useState(false);
  // const apiLink = process.env.REACT_APP_ANONIFY_API;
  const apiLink = "https://anonify-backend.onrender.com";
  const messageURI = `${apiLink}/messages/`;

  // UseEffect to get token and user
  useEffect(() => {
    checkAuthStatus() ? "" : router.push("/");
    // if (typeof window !== "undefined") {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    // }
  }, [checkAuthStatus, router]);

  // Function to get currently logged in user's message
  const getCurrentUserMessages = () => {
    setError("");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    fetch(messageURI, {
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setMessages(data.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        console.log("An error occured when fetching data", error);
      });
  };

  useEffect(() => {
    getCurrentUserMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShare = () => {
    setShare((prev) => !prev);
  };

  const formateDate = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = days[date.getUTCDay()];
    const year = date.getUTCFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const dateOfMonth = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    const formattedDate = `${dayOfWeek}, ${dateOfMonth} ${month} ${year} ${formattedTime}`;
    return formattedDate;
  };

  return (
    <>
      {" "}
      {/* <DynamicNavbar /> */}
      <Navbar />
      <section className={`${styles.dashboard} ${share ? styles.dim : ""}`}>
        <h2 className={styles.dashboard__header}>
          {" "}
          {currentUser?.username}&apos;s Message Dashboard
        </h2>
        {loading ? (
          <div className={styles.loading}>
            <p>Loading your anonymous messages...</p>
          </div>
        ) : (
          ""
        )}
        {messages
          ? messages.map((message, index) => (
              <div key={index} className={styles.content}>
                <p className={styles.content__header}>New Anonify Message:</p>
                <p className={styles.content__text}>{message.messageContent}</p>
                <p>-Anonify- {formateDate(message.timeSent)}</p>
                <div className={styles.content__button}>
                  {/* <button onClick={handleShare}>Share message</button> */}
                  {/* <button>Archive message</button> */}
                </div>
              </div>
            ))
          : ""}
        {/* <div className={styles.shareComponent}>
          {share ? <ShareComponent /> : ""}
        </div> */}
      </section>
    </>
  );
};

export default Dashboard;
