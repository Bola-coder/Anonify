import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./../../styles/CreateMessage.module.css";
import Navbar from "../../Components/Navbar";

const CreateNewMessage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  //   const apiLink = process.env.REACT_APP_ANONIFY_API;
  const apiLink = "http://localhost:5000";
  const link = `${apiLink}/user/me/${slug}`;
  const [recipient, setRecipient] = useState([]);
  const [message, setMessage] = useState("");
  let name = router.query.slug;
  name = name?.toUpperCase();

  //   function to get the user data based on the slug in url
  const getUserFromSlug = () => {
    fetch(link, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipient(data.user);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    getUserFromSlug();
    console.log(recipient);
    if (recipient) {
      const content = JSON.stringify({
        userId: recipient[0]?._id,
        messageContent: message,
      });
      console.log(recipient[0]?._id);
      fetch(`${apiLink}/messages`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: content,
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Navbar />
      <section className={styles.createMessage}>
        <h2>Send an anonymous message to {name}.</h2>
        <p>They wont know you sent it.</p>
        <form className={styles.createMessage__form}>
          <textarea
            type="text"
            name="message"
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleMessageSubmit}>Send Message</button>
        </form>
      </section>
    </>
  );
};

export default CreateNewMessage;
