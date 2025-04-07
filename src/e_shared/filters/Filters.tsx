"use client";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import styles from "./Filters.module.css";
import { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categoryList, priorityList } from "./data";
import Calendar from "../calendar/Calendar";
import dayjs, { Dayjs } from "dayjs";
import { parseDay } from "@/utils/getDate";
import { CalendarIcon } from "@/icons/calendarIcon/CalendarIcon";
import { useTimeoutState } from "@/hooks/useTimeoutState";

interface Props {
  onChange: (query: string | { from: string, to: string }, type: "priority" | "category" | "deadline") => void;
  type: "today" | "upcoming" | "completed" | "important" | "all";
}

const Filters = ({ onChange, type }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [isPriorityOptionsOpen, setIsPriorityOptionsOpen] = useState(false);
  const [isCategoryOptionsOpen, setIsCategoryOptionsOpen] = useState(false);
  const [isDateOptionsOpen, setIsDateOptionsOpen] = useState(false);
  const dropDownRef = useRef<HTMLUListElement | null>(null);
  const priorityOptionsRef = useRef<HTMLUListElement | null>(null);
  const categoryOptionsRef = useRef<HTMLUListElement | null>(null);
  const dateOptionsRef = useRef<HTMLUListElement | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const [calendarState, setCalendarState] = useTimeoutState<{
    isOpen: boolean,
    isSelected: boolean
  }>({
    isOpen: false,
    isSelected: false,
  });
  const [date, setDate] = useState({
    from: false,
    to: false,
    fromValue: "",
    toValue: "",
  });

  useEffect(() => {
    if (isActive) {
      const handleClickOutside = (event: MouseEvent) => {
        if (!dropDownRef.current?.contains(event.target as Node)) {
          setIsActive(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isActive]);

  useEffect(() => {
    if (priorityOptionsRef.current && categoryOptionsRef.current && dateOptionsRef.current) {
      if (isPriorityOptionsOpen) {
        priorityOptionsRef.current.style.maxHeight = `${priorityOptionsRef.current.scrollHeight}px`;
      } else {
        priorityOptionsRef.current.style.maxHeight = `0`;
      }

      if (isCategoryOptionsOpen) {
        categoryOptionsRef.current.style.maxHeight = `${categoryOptionsRef.current.scrollHeight}px`;
      } else {
        categoryOptionsRef.current.style.maxHeight = `0`;
      }

      if (isDateOptionsOpen) {
        dateOptionsRef.current.style.maxHeight = `${dateOptionsRef.current.scrollHeight}px`;
      } else {
        dateOptionsRef.current.style.maxHeight = `0`;
      }
    }
  }, [isPriorityOptionsOpen, isCategoryOptionsOpen, isDateOptionsOpen]);

  const handleFilterChange = (value: string, type: "priority" | "category" | "deadline") => {
    setFilterValue(value);
    onChange(value, type)
    setIsActive(false);
  };

  const handleCalendarChange = (newValue: Dayjs) => {
    const parsedDay = parseDay(newValue.toDate().toDateString());
    if (date.fromValue || date.toValue) {
      if (date.fromValue) {
        setDate((prev) => ({ ...prev, toValue: parsedDay }));
      } else {
        setDate((prev) => ({ ...prev, fromValue: parsedDay }));
      }
      const from = date.fromValue ? date.fromValue : parsedDay;
      const to = date.toValue ? date.toValue : parsedDay;
      setIsActive(false);
      setFilterValue(`от ${from} до ${to}`);
      onChange({ from, to }, "deadline");
    } else {
      if (date.from) {
        setDate((prev) => ({ ...prev, fromValue: parsedDay }));
      } else {
        setDate((prev) => ({ ...prev, toValue: parsedDay }));
      }
    }
    setCalendarState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className={styles.filters_container}>
      <button className={styles.filters_btn} onClick={() => setIsActive((prev) => !prev)}>
        <FilterAltIcon />
        <span>{filterValue ? filterValue : "Фильтры"}</span>
      </button>
      <ul ref={dropDownRef} className={isActive ? styles.filters_dropdown : styles.hide_dropdown}>
        {type !== "important" && <>
          <li
            className={styles.list_item}
            onClick={() => {
              setIsPriorityOptionsOpen((prev) => !prev);
              setIsCategoryOptionsOpen(false);
              setIsDateOptionsOpen(false);
            }}
          >
            Приоритет
           <ExpandMoreIcon style={isPriorityOptionsOpen ? {transform: "rotate(180deg)"} : {}} />
          </li>
          <ul ref={priorityOptionsRef} className={styles.options}>
            {priorityList.map((elem) => (
              <li
                onClick={() => handleFilterChange(String(elem.value), "priority")}
                className={styles.list_item_options}
                key={elem.value}
              >
                {elem.value}
                {elem.icon}
              </li>
            ))}
          </ul>
        </>}
        <li
          className={styles.list_item}
          onClick={() => {
            setIsCategoryOptionsOpen((prev) => !prev);
            setIsPriorityOptionsOpen(false);
            setIsDateOptionsOpen(false);
          }}
        >
          Категория
          <ExpandMoreIcon style={isCategoryOptionsOpen ? {transform: "rotate(180deg)"} : {}}/>
        </li>
        <ul ref={categoryOptionsRef} className={styles.options}>
          {categoryList.map((elem) => (
            <li
              onClick={() => handleFilterChange(elem.value, "category")}
              className={styles.list_item_options}
              key={elem.value}
            >
              {elem.label.text}
              {elem.label.icon()}
            </li>
          ))}
        </ul>
        {type !== "today" && <>
          <li
            className={styles.list_item}
            onClick={() => {
              setIsDateOptionsOpen((prev) => !prev);
              setIsCategoryOptionsOpen(false);
              setIsPriorityOptionsOpen(false);
            }}
          >
            Срок
            <ExpandMoreIcon style={isDateOptionsOpen ? {transform: "rotate(180deg)"} : {}}/>
          </li>
          <ul ref={dateOptionsRef} className={`${styles.options} ${styles.calendar_options}`}>
            <li
              onClick={() => {
                setDate((prev) => ({ ...prev, to: false, from: true }));
                setCalendarState((prev) => ({ ...prev, isOpen: true }));
              }}
              className={styles.list_item_options}
            >
              {date.fromValue ? (
                `от ${date.fromValue}`
              ) : (
                <>
                  Начало даты <CalendarIcon />
                </>
              )}
            </li>
            <li
              onClick={() => {
                setDate((prev) => ({ ...prev, to: true, from: false }));
                setCalendarState((prev) => ({ ...prev, isOpen: true }));
              }}
              className={styles.list_item_options}
            >
              {date.toValue ? (
                `до ${date.toValue}`
              ) : (
                <>
                  Конец даты <CalendarIcon />
                </>
              )}
            </li>
            {calendarState.isOpen && (
              <Calendar
                classes={styles.filters_calendar}
                handleChange={handleCalendarChange}
                value={dayjs(new Date())}
                setIsOpen={setCalendarState}
                disablePrevDates={type === "upcoming"}
              />
            )}
          </ul>
        </>}

      </ul>
    </div>
  );
};

export default Filters;
