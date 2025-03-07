import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./AddTaskModal.module.css";
import AddTaskFrom from "@/e_shared/addTaskForm/AddTaskForm";
import { useInfoModalState } from "@/hooks/useInfoModalState";
import InfoModal from "../infoModal/InfoModal";
import { useAddTaskForm } from "@/store/addTaskForm/addTaskForm";

interface Props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddTaskModal = ({ isOpen, setOpen }: Props) => {
  const [infoModal, setInfoModal] = useInfoModalState();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { refs } = useAddTaskForm(); 

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    const handleClickOutside = (e: MouseEvent) => {
      console.log(refs);
      
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) 
      ) {
        document.body.style.overflowY = "scroll";
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refs]);

  return (
    isOpen && (
      <>
        {infoModal.isActive && <InfoModal modalState={infoModal} setModalState={setInfoModal} />}
        {createPortal(
          <div className={styles.background_container}>
            <div ref={modalRef} className={styles.modal_container}>
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
