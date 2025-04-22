import Image from "next/image";
import styles from "./NoChats.module.css";
import noChat from "../../../../../public/no_chat.webp";

export const NoChats = () => {
  return (
    <div className={styles.no_chats_container}>
      <Image width={250} height={250} src={noChat} quality={100} alt="no chats illustration" />
      <div className={styles.no_chats_text_wrapper}>
        <p>У вас нет активных чатов</p>
      </div>
    </div>
  );
};
