import React from "react";
import styles from "./UserCommentCard.module.css";

const UserCommentCard = props => {
  const { avatar, date, name, score, text } = props.userComment;
  return (
    <div className={styles.commentsCardContainer}>
      <div>
        <div className={styles.commentsAvatarContainer}>
          <img src={avatar} alt="avatar" />
        </div>
      </div>
      <div>
        <div className={styles.commentsHeader}>
          <p>{name}</p>
          <p>{date}</p>
        </div>
        <div className={styles.commentsBody}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCommentCard;
