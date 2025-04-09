import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ISortingOptions, SortValuesType } from "./types";
import styles from "./Sorting.module.css";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { ITodoResponse } from "../types/types";
import { quickSort } from "@/utils/sorting";

interface Props {
  todoes: ITodoResponse[];
  setTodoes: Dispatch<SetStateAction<ITodoResponse[]>>;
  options: ISortingOptions[];
  onReset: () => void;
  disabled?: boolean;
}

interface ISortOrder {
  label: "По возрастанию" | "По убыванию";
  value: "asc" | "desc";
}

const sortOrder: ISortOrder[] = [
  {
    label: "По возрастанию",
    value: "asc",
  },
  {
    label: "По убыванию",
    value: "desc",
  },
];

const Sorting = ({ todoes, setTodoes, options, onReset, disabled }: Props) => {
  const [open, setOpen] = useState(false);
  const [orderValue, setOrderValue] = useState<ISortOrder>(sortOrder[0]);
  const [option, setOption] = useState<{
    value: SortValuesType | "default";
    label: string;
  }>({
    value: "default",
    label: "Сортировка",
  });
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (open) {
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setOpen((prev) => !prev);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [open]);

  function handleOptionChange(sortOption: ISortingOptions) {
    setTodoes(quickSort(todoes, sortOption.value, orderValue.value));
    setOption({ value: sortOption.value, label: sortOption.label });
    setOpen((prev) => !prev);
  }

  function handleSortOrderChange(order: ISortOrder) {
    setOrderValue(order);
    if (option.value === "default") return;
    setTodoes(quickSort(todoes, option.value, order.value));
  }

  return (
    <div className={styles.sort_wrapper}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={
          disabled && option.value === "default"
            ? `${styles.sorting_btn} ${styles.disabled_sort_btn}`
            : styles.sorting_btn
        }
      >
        <SwapVertIcon fontSize="medium" />
        <span className={styles.sorting_container}>{option.label}</span>
      </button>
      <div
        style={option.value === "default" ? { opacity: "0.6" } : {}}
        className={styles.sort_order_wrapper}
      >
        <div
          style={option.value === "default" ? { pointerEvents: "none" } : {}}
          role="button"
          onClick={() => handleSortOrderChange(sortOrder[0])}
          className={`${styles.sort_order_chip} ${
            sortOrder[0].value === orderValue.value ? styles.sort_order_chip_active : ""
          }`}
        >
          {sortOrder[0].label}
        </div>
        <div
          style={option.value === "default" ? { pointerEvents: "none" } : {}}
          role="button"
          onClick={() => handleSortOrderChange(sortOrder[1])}
          className={`${styles.sort_order_chip} ${
            sortOrder[1].value === orderValue.value ? styles.sort_order_chip_active : ""
          }`}
        >
          {sortOrder[1].label}
        </div>
      </div>
      {open && (
        <ul ref={dropdownRef} className={styles.dropdown}>
          <span className={styles.title}>Порядок сортировки</span>
          <hr style={{ border: "1px solid gainsboro" }} />
          {options.map((elem) => {
            const activeClass = elem.value === option.value ? styles["list_item_active"] : "";
            return (
              <li
                onClick={() => handleOptionChange(elem)}
                className={`${styles.list_item} ${activeClass}`}
                key={elem.value}
              >
                {elem.icon}
                <span>{elem.label}</span>
              </li>
            );
          })}
          <hr style={{ border: "1px solid gainsboro" }} />
          <li
            onClick={() => {
              setOpen(false);
              setOption({
                value: "default",
                label: "Сортировка",
              });
              onReset();
            }}
            className={styles.list_item}
          >
            Сбросить сортировку
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sorting;
