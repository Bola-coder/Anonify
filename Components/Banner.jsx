import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./../styles/Banner.module.css";

const Banner = () => {
  return (
    <section className={styles.banner}>
      {/* <div className={styles.header}>
        <p>Anonify</p>
        <Link href="/profile">        
        <p>Profile</p>
        </Link>
      </div> */}
      <div className={styles.content}>
        <div className={styles.banner__text}>
          <h1>Send And Receive Anonymous Messages.</h1>
          <p>
            Anonify allows you to create your own secret anonymous links that
            you can use to get message anonymously from people. It is free and
            easy to set up.
          </p>
          <Link href="/signup">
            <button>START NOW</button>
          </Link>
        </div>
        <div className={styles.banner__image}>
          <Image
            src="/images/secure.png"
            alt="Secure Key"
            width={290}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
