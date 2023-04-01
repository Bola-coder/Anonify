import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaCopy } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../../Components/Navbar";
import styles from "./../../styles/Profile.module.css";
import { useRouter } from "next/router";

const Profile = () => {
  const { user, setUser, checkAuthStatus } = useAuth();
  const [link, setLink] = useState(null);
  const [showLink, setShowLink] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus() ? "" : router.push("/denied");
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userString = window.localStorage.getItem("user");
      setUser(JSON.parse(userString));
    }
  }, [setUser]);

  const generateAnonLink = () => {
    console.log("Genarating Anonify link");
    const genLink = `https://anonify.netlify.app/create/${user.slug}`;
    setLink(genLink);
    setShowLink((prev) => !prev);
  };

  //   Function to copy the user's anonify link to clipboard
  const copyAnonLinkToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied successfully");
        setShowLink(false);
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
      <Head>
        <title>Anonify | Profile</title>
      </Head>
      <Navbar />
      <section className={styles.profile}>
        <div className={styles.profileContent}>
          <h3>Hello {user?.username}, Welcome to your profile</h3>
          <Image
            src="/images/secureKey.png"
            alt="Profile image"
            width={260}
            height={260}
          />
          {showLink ? (
            <div className={styles.profile__link}>
              <p>{link}</p>
              <p
                onClick={() =>
                  copyAnonLinkToClipboard(`Hi guys!!!, Send me an anonymous message using Anonify.\n
    Click on my link below to send me an anonymous message\n${link}`)
                }
              >
                Copy anonymous link <FaCopy />
              </p>
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
