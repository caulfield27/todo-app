import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import styles from "./AddTaskModal.module.css";
import AddTaskFrom from "@/e_shared/addTaskForm/AddTaskForm";
import { useInfoModalState } from "@/hooks/useInfoModalState";
import InfoModal from "../infoModal/InfoModal";

interface Props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddTaskModal = ({ isOpen, setOpen }: Props) => {
  const [infoModal, setInfoModal] = useInfoModalState();
  return (
    isOpen && (
      <>
        {infoModal.isActive && <InfoModal modalState={infoModal} setModalState={setInfoModal} />}
        {createPortal(
          <div className={styles.background_container}>
            <div className={styles.modal_container}>
              {isOpen && (
                <AddTaskFrom
                  isModal={true}
                  setAddTaskActive={setOpen}
                  setInfoModal={setInfoModal}
                  type="all"
                />
              )}
            </div>
          </div>,
          document.body
        )}
      </>
    )
  );
};

export default AddTaskModal;
