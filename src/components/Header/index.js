import React from "react";
import styles from "./Header.module.css";
import logo from "../../assests/Images/logo.png";

const Header = props => {
  return (
    <div className={styles.headerContainerOuter}>
      <div className={styles.headerContainerInner}>
        <div className={styles.headerLogoContainer}>
          <img src={logo} alt="logo" />
        </div>
        <ul className={styles.headerLinkList}>
          <li className={styles.headerLinkListItem}>
            <a href="/" alt="homepage">
              <span>
                <i className="fa fa-home mr-2" />
              </span>
              <span>Home</span>
            </a>
          </li>
          <li className={styles.headerLinkListItem}>
            <a href="/">
              <span>
                <i className="fa fa-linkedin-square mr-2" />
              </span>
              <span>LinkedIn</span>
            </a>
          </li>
          <li className={styles.headerLinkListItem}>
            <a href="/">
              <span>
                <i className="fa fa-github-square mr-2" />
              </span>
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
