import React from "react";
import { createPortal } from "react-dom";
import styles from "./AddTaskModal.module.css";

interface Props {
  isOpen: boolean;
}

const AddTaskModal = ({ isOpen }: Props) => {
  return (
    isOpen &&
    createPortal(
      <div
        className={styles.modal_container}
      ></div>,
      document.body
    )
  );
};

export default AddTaskModal;
