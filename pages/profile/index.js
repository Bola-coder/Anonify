import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaClipboardList } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../../Components/Navbar";
import styles from "./../../styles/Profile.module.css";
import { useRouter } from "next/router";

const Profile = () => {
  const { user } = useAuth();
  const [link, setLink] = useState(null);
  const [showLink, setShowLink] = useState(false);
  const router = useRouter();

  const generateAnonLink = () => {
    console.log("Genarating Anonify link");
    const genLink = `https://anonify.netlify.app/create/${user?.slug}`;
    setLink(genLink);
    setShowLink((prev) => !prev);
  };

  //   Function to copy the user's anonify link to clipboard
  const copyAnonLinkToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied successfully");
      })
      .catch((err) => {
        console.log("An error occured when copying text. Please try again");
      });
  };

  //Navigate to Dashboard page
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <Navbar />
      <section className={styles.profile}>
        <div className={styles.profileContent}>
          <h3>Hello {user?.username}, Welcome to your profile</h3>
          <Image
            src="/images/secureKey.png"
            alt="Profile image"
            width={300}
            height={300}
          />
          {showLink ? (
            <div className={styles.profile__link}>
              <p onClick={() => copyAnonLinkToClipboard(link)}>{link} </p>
              <FaClipboardList onClick={() => copyAnonLinkToClipboard(link)} />
            </div>
          ) : (
            ""
          )}
          <div className={styles.btns}>
            <button onClick={generateAnonLink}>
              Get your unique Anonify link.{" "}
            </button>
            <button onClick={goToDashboard}>View your messages</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
