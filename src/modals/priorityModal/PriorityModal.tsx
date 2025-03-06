import PriorityIcon from "@/icons/priorityIcon/PriorityIcon";
import styles from "./PriorityModal.module.css";
import "../../app/globals.css";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface Props {
  value?: number;
  handleChange?: (value: number) => void;
  setIsOpen: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      isSelected: boolean;
    }>
  >;
  classes?: string;
}

const PriorityModal = ({ value, handleChange, setIsOpen, classes }: Props) => {
  const priorityRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const timeOut = setTimeout(()=>{
      const handleOutsideClick = (e: MouseEvent) => {
        if (priorityRef.current && !priorityRef.current.contains(e.target as Node)) {
          setIsOpen((prev) => ({ isOpen: false, isSelected: prev.isSelected }));
        }
      };
      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    },0)

    return ()=>{
      clearTimeout(timeOut);
    }
  }, []);

  return (
    <ul ref={priorityRef} className={`${styles.ul_container} ${classes ?? ""}`}>
      <li
        onClick={(e: any) => (handleChange ? handleChange(e?.target?.dataset?.value ?? 1) : {})}
        className={`${styles.list_item} ${value === 1 ? styles.active_item : ""}`}
        data-value={1}
      >
        <PriorityIcon color="#68FF6D" /> 1
      </li>
      <li
        onClick={(e: any) => (handleChange ? handleChange(e?.target?.dataset?.value ?? 1) : {})}
        className={`${styles.list_item} ${value === 2 ? styles.active_item : ""}`}
        data-value={2}
      >
        <PriorityIcon color="#E6FF00" /> 2
      </li>
      <li
        onClick={(e: any) => (handleChange ? handleChange(e?.target?.dataset?.value ?? 1) : {})}
        className={`${styles.list_item} ${value === 3 ? styles.active_item : ""}`}
        data-value={3}
      >
        <PriorityIcon color="#FFBB1A" /> 3
      </li>
      <li
        onClick={(e: any) => (handleChange ? handleChange(e?.target?.dataset?.value ?? 1) : {})}
        className={`${styles.list_item} ${value === 4 ? styles.active_item : ""}`}
        data-value={4}
      >
        <PriorityIcon color="#FF0000" /> 4
      </li>
    </ul>
  );
};

export default PriorityModal;
