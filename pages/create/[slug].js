import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CreateNewMessage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  //   const apiLink = process.env.REACT_APP_ANONIFY_API;
  const apiLink = "http://localhost:5000";
  const link = `${apiLink}/user/me/${slug}`;

  const [recipient, setRecipient] = useState(null);
  const [message, setMessage] = useState("");

  //   useEffect(() => {
  //     //   Hello
  //   }, []);
  //   console.log("recipient", recipient);

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
  // useEffect(() => {
  // }, [link]);

  const handleMessageSubmit = () => {
    getUserFromSlug();
    console.log(recipient);
    console.log("helo");
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
      <h2>Hello welcome to the create message panel</h2>

      <input
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" onClick={handleMessageSubmit}>
        Submit Message
      </button>
      <p>{message}</p>
    </>
  );
};

export default CreateNewMessage;
