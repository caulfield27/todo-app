"use client";
import Image from "next/image";
import styles from "./NoDataFound.module.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isFilter: boolean;
  setShowAddTaskModal: Dispatch<SetStateAction<boolean>>;
  onReset: () => void;
  infoText: string;
}

const NoDataFound = ({ isFilter, setShowAddTaskModal, onReset, infoText }: Props) => {
  return (
    <div className={styles.no_data_found_wrapper}>
      <Image
        src={"/no-data.jpg"}
        alt="no data found illustration"
        priority
        quality={100}
        width={250}
        height={250}
        style={{borderRadius: "24px"}}
      />
      <p>{isFilter ? "Нет задчач по заданным фильтрам" : infoText}</p>
      <button
        className={styles.not_found_add_btn}
        onClick={isFilter ? onReset : () => setShowAddTaskModal(true)}
      >
        {isFilter ? "Сбросить фильтр" : "Добавить задачу"}
      </button>
    </div>
  );
};

export default NoDataFound;
