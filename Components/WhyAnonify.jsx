import React from "react";
import { FaArchive, FaFreebsd, FaLock } from "react-icons/fa";
import styles from "./../styles/WhyAnonify.module.css";

const WhyAnonify = () => {
  const whyus = [
    {
      icon: <FaLock />,
      header: "Anonymous",
      text: "Anonify is an anonymous messging web app. People won't know who is sending them a message and your identity is protected while you say out your mind.",
    },
    {
      icon: <FaArchive />,
      header: "Simple to use",
      text: "Anonify is a simple to use anonymous messging web app. There are no complexities and you are started in just few clicks.",
    },
    {
      icon: <FaFreebsd />,
      header: "Free",
      text: "Anonify is a free app. You don't need to pay to use the messaging app. It is free now and forever.",
    },
  ];
  return (
    <section className={styles.whyus}>
      <h2>Why Anonify?</h2>
      <div className={styles.whyus__container}>
        {whyus.map((content, index) => (
          <div className={styles.whyus__content} key={index}>
            <p className={styles.whyus__icon}>{content.icon}</p>
            <h3 className={styles.whyus__header}>{content.header}</h3>
            <p className={styles.whyus__text}>{content.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyAnonify;
