import React from "react";
import Image from "next/image";
import styles from "./../styles/Banner.module.css";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.header}>
        <p>Anonify</p>
      </div>
      <div className={styles.content}>
        <div className={styles.banner__text}>
          <h1>Send And Receive Anonymous Messages.</h1>
          <p>
            Anonify allows you to create your own secret anonymous links that
            you can use to get message anonymously from people. It is free and
            easy to set up.
          </p>
          <button>START NOW</button>
        </div>
        <div className={styles.banner__image}>
          <Image
            src="/images/secure.png"
            alt="Secure Key"
            width={300}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
