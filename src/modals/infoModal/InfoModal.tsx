import { createPortal } from "react-dom";
import styles from "./InfoModal.module.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ISnackBar } from "@/store/global/global";

interface Props {
  modalState: { isActive: boolean; message: string; type: "success" | "error" };
  setModalState: (info: ISnackBar)=> void
}

const InfoModal = ({ modalState, setModalState }: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setModalState({ isActive: false, message: "", type: "success" });
    }, 8000);

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setModalState({ isActive: false, message: "", type: "success" });
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      clearTimeout(timeOut);
    };
  }, [modalState]);

  return createPortal(
    <article
      style={
        modalState.type === "success"
          ? { border: "3px solid #35be35" }
          : { border: "3px solid #ff7171" }
      }
      ref={ref}
      className={styles.modal}
    >
      <span>{modalState.message}</span>
      <button
        style={modalState.type === "success" ? { color: "#35be35" } : { color: "#ff7171" }}
        onClick={() => setModalState({ isActive: false, message: "", type: "success" })}
      >
        &times;
      </button>
    </article>,
    document.body
  );
};

export default InfoModal;
