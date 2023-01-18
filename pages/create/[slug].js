import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CreateNewMessage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const link = `http://localhost:5000/user/me/${slug}`;

  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    const getUserFromSlug = () => {
      fetch(link, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setRecipient(data.user);
        })

        .catch((err) => console.log(err));
    };
    getUserFromSlug();
  }, [link]);
  console.log("recipient", recipient);

  return (
    <>
      <h2>Hello welcome to the create message panel</h2>
    </>
  );
};

export default CreateNewMessage;
