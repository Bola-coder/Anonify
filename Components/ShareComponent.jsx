import React from "react";

import { FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import styles from "./../styles/ShareComponent.module.css";

const ShareComponent = () => {
  return (
    <div className={styles.share}>
      <p>Share this message on:</p>
      <div className={styles.share__icons}>
        <span className={styles.share__icon}>
          <FaWhatsapp className={styles.whatsapp} />
        </span>
        <span className={styles.share__icon}>
          <FaTwitter className={styles.twitter} />
        </span>
        <span className={styles.share__icon}>
          <FaInstagram className={styles.instagram} />
        </span>
      </div>
    </div>
  );
};

export default ShareComponent;
