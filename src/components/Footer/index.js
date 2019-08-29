import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainerOuter}>
      <div className={styles.footerContainerInner}>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default Footer;
