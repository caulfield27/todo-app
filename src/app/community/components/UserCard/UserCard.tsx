"use client";

import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import styles from "./UserCard.module.css";
import { BASE_URL } from "@/e_shared/get-env";
import MessageIcon from "@mui/icons-material/Message";
import { useEffect, useRef, useState } from "react";
import Popover from "@/e_shared/popover/Popover";

interface Props {
  avatar: string | null;
  name: string;
  isOnline?: boolean;
  handleOpenChat: ()=> void
}

const UserCard = ({ avatar, name, isOnline, handleOpenChat }: Props) => {
  return (
    <div className={styles.user_card_container}>
      <div className={styles.user_card_info_wrapper}>
        {avatar ? (
          <Avatar alt={`${name} avatar`} src={BASE_URL + avatar} />
        ) : (
          <Avatar sx={{ bgcolor: deepOrange["500"] }}>{name[0].toLocaleUpperCase()}</Avatar>
        )}
        <span>{name}</span>
      </div>
      <div className={styles.msg_wrapper} onClick={handleOpenChat}>
        <MessageIcon style={{color: "#55df50"}}/>
        <Popover content="Написать" classes={styles.popover} arrow="top" bg="black"/>
      </div>
      {isOnline && <div className={styles.online}></div>}
    </div>
  );
};

export default UserCard;
