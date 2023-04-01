import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./../../styles/CreateMessage.module.css";
import Navbar from "../../Components/Navbar";

const CreateNewMessage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const apiLink = "https://anonify-backend.onrender.com";
  // const link = `${apiLink}/user/me/${slug}`;
  const [link, setLink] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  let name = router.query.slug;
  name = name?.toUpperCase();

  useEffect(() => {
    setLink(`${apiLink}/user/me/${slug}`);
    console.log("Link is this: ", link);
  }, [slug]);

  const getUserFromSlug = () => {
    fetch(link, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipient(data.user);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // const getUserFromSlug = () => {
    //   fetch(link, {
    //     method: "GET",
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       setRecipient(data.user);
    //     })
    //     .catch((err) => console.log(err));
    // };
    getUserFromSlug();
    console.log("Message recipient", recipient);
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    getUserFromSlug();
    setFeedback("");
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
        .then((data) => {
          console.log(data);
          setMessage("");
          setFeedback(`Anonymous message sent successfully to ${name}`);
          alert(feedback);
        })
        .catch((err) => {
          console.log(err);
          setFeedback(`Failed to send anonymous message!, please try again`);
          alert(feedback);
        });
    } else {
      console.log("error don happen");
      setFeedback(`Failed to send anonymous message!, please try again`);
      alert(feedback);
    }
  };

  return (
    <>
      <Head>
        <title>Anonify | Create Message</title>
      </Head>
      <Navbar />
      <section className={styles.createMessage}>
        <div>
          <h2>Send an anonymous message to {name}.</h2>
          <p>They wont know who sent it.</p>
        </div>
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
