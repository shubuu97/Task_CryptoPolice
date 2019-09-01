import React from "react";
import styles from "./UserProfileCard.module.css";
const UserProfileCard = ({
  avatar,
  name,
  category,
  email,
  country,
  phoneNumber,
  website
}) => {
  return (
    <div className={`${styles.profileContainer}`}>
      <div className={styles.profileAvatarContainer}>
        <div className={`${styles.profileCardAvatar}`}>
          <img src={avatar} alt="avatar" />
        </div>
        <div>
          <p>{name}</p>
          <p>{email}</p>
          <div>{phoneNumber}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <p className="text-capitalize">{category} developer</p>
          <p>From {country}</p>
          <div>{website}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
