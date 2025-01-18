"use client";
import { getUserName } from "@/utils/getUser";
import { useEffect, useState } from "react";
import styles from "./AddTaskForm.module.css";
import "../../app/globals.css";
import Calendar from "../calendar/Calendar";
import dayjs, { Dayjs } from "dayjs";
import { parseDay } from "@/utils/getDate";
import { CalendarIcon } from "@/icons/calendarIcon/CakendarIcon";
import PriorityStatic from "@/icons/priorityIcon/PriorityStatic";
import PriorityModal from "@/modals/priorityModal/PriorityModal";
import Popover from "../popover/Popover";

interface IFormData {
  subject: string;
  isExpired: boolean;
  isCompleted: boolean;
  deadline: null | Dayjs;
  userName: string;
  priority: number;
}

interface IOptionsState {
  isOpen: boolean;
  isSelected: boolean;
}

const AddTaskFrom = () => {
  const [formData, setFormData] = useState<IFormData>({
    subject: "",
    isExpired: false,
    isCompleted: false,
    deadline: null,
    userName: "",
    priority: 1,
  });

  const [calendarState, setCalendarState] = useState<IOptionsState>({
    isOpen: false,
    isSelected: false,
  });
  const [priorityState, setPriorityState] = useState<IOptionsState>({
    isOpen: false,
    isSelected: false,
  });

  useEffect(() => {
    setFormData({ ...formData, ["userName"]: getUserName() });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDeadlineChnage = (newValue: Dayjs) => {
    setFormData({ ...formData, ["deadline"]: newValue });
    setCalendarState({ isOpen: false, isSelected: true });
  };

  const handlePriorityChange = (value: number) => {
    setFormData({ ...formData, ["priority"]: +value });
    setPriorityState({ isOpen: false, isSelected: true });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        autoFocus
        className={styles.input}
        type="text"
        placeholder="Добавить задачу"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, ["subject"]: e.target.value })
        }
      />
      <div className={styles.options_wrapper}>
        <div className={styles.options_container}>
          <div className={styles.calendar_wrapper}>
            <div className={styles.options_icon_container}>
              {calendarState.isSelected ? <div></div> : <CalendarIcon
                handleClick={() => setCalendarState((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
              />}
              <Popover bg="black" content="Добавить дату выполнения" />
            </div>
            {calendarState.isOpen && (
              <Calendar
                setIsOpen={setCalendarState}
                handleChange={handleDeadlineChnage}
                value={formData.deadline ?? dayjs(parseDay(new Date().toString()))}
                classes={styles["calendar"]}
              />
            )}
          </div>
          <div className={styles.priority_wrapper}>
            <div className={styles.options_icon_container}>
              <PriorityStatic
                handleClick={() => setPriorityState((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
              />
              <Popover bg="black" content="Добавить приоритет" />
            </div>
            {priorityState.isOpen && (
              <PriorityModal
                value={formData.priority}
                handleChange={handlePriorityChange}
                setIsOpen={setPriorityState}
                classes={styles["priority_modal"]}
              />
            )}
          </div>
        </div>
        <div className={styles.controll_buttons_wrapper}>
          <button className={styles.cancel_btn}>Отмена</button>
          <button className={styles.submit_btn} type="submit">
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskFrom;
