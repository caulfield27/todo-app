import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { ISortingOptions, sortingOptions } from "./data";
import styles from "./Sorting.module.css";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { ITodoResponse } from "../types/types";
import { strapi } from "../api";
import { quickSort } from "@/utils/sort";

interface Props {
  todoes: ITodoResponse[];
  setTodoes: Dispatch<SetStateAction<ITodoResponse[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  token: string
}

const Sorting = ({ todoes, setTodoes, setLoading, token }: Props) => {  
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState({
      value: "default",
      label: "Сортировка",
    }
  );
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  function handleOptionChange(option: ISortingOptions) {
    if (option.value === "reset") {
      setOption({ value: "default", label: "Сортировка" });
      
    } else {
      quickSort(todoes, option.value)
      setOption({ value: option.value, label: option.label });
    }
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    if (open) {
      const handleClickOutside = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setOpen((prev) => !prev);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [open]);

  return (
    <div className={styles.sort_wrapper}>
      <button onClick={() => setOpen((prev) => !prev)} className={styles.sorting_btn}>
        <SwapVertIcon fontSize="medium" />
        <span className={styles.sorting_container}>{option.label}</span>
      </button>
      {open && (
        <ul ref={dropdownRef} className={styles.dropdown}>
          <span className={styles.title}>Порядок сортировки</span>
          <hr style={{ border: "1px solid gainsboro" }} />
          {sortingOptions.map((option) => {
            return (
              <li
                onClick={() => handleOptionChange(option)}
                className={styles.list_item}
                key={option.value}
              >
                {option.icon}
                <span>{option.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Sorting;
