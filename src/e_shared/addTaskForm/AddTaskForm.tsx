"use client";
import { getUserAttribute } from "@/utils/getUser";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./AddTaskForm.module.css";
import "../../app/globals.css";
import Calendar from "../calendar/Calendar";
import dayjs, { Dayjs } from "dayjs";
import { parseDateToReadable, parseDay, parseDeadlineToReadable } from "@/utils/getDate";
import { CalendarIcon } from "@/icons/calendarIcon/CalendarIcon";
import PriorityStatic from "@/icons/priorityIcon/PriorityStatic";
import PriorityModal from "@/modals/priorityModal/PriorityModal";
import Popover from "../popover/Popover";
import PriorityIcon from "@/icons/priorityIcon/PriorityIcon";
import { getToken } from "@/utils/getToken";
import { strapi } from "../api";
import { apiUrl } from "@/routes";
import { ITodoResponse } from "../types/types";
import Loader from "../loader/Loader";

interface IFormData {
  subject: string;
  isExpired: boolean;
  isCompleted: boolean;
  deadline: null | Dayjs;
  userName: number | null;
  priority: number;
}

interface IOptionsState {
  isOpen: boolean;
  isSelected: boolean;
}

const priorityColors: { [key: string]: string } = {
  "1": "#68FF6D",
  "2": "#E6FF00",
  "3": "#FFBB1A",
  "4": "#FF0000",
}

interface Props {
  setAddTaskActive: Dispatch<SetStateAction<boolean>>,
  todoes: ITodoResponse[] | [],
  setTodoes: Dispatch<SetStateAction<ITodoResponse[] | []>>
}

const AddTaskFrom = ({ setAddTaskActive, todoes, setTodoes }: Props) => {
  const [formData, setFormData] = useState<IFormData>({
    subject: "",
    isExpired: false,
    isCompleted: false,
    deadline: null,
    userName: null,
    priority: 1,
  });
  const [loading, setLoading] = useState(false);

  const [calendarState, setCalendarState] = useState<IOptionsState>({
    isOpen: false,
    isSelected: false,
  });
  const [priorityState, setPriorityState] = useState<IOptionsState>({
    isOpen: false,
    isSelected: false,
  });

  useEffect(() => {
    setFormData({ ...formData, userName: getUserAttribute('id') });

  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getToken().then((token) => {
      setLoading(true);
      return strapi.post(apiUrl.todoes, {
        data: {...formData, deadline: formData.deadline ? parseDay(formData.deadline?.toDate()+"") : formData.deadline}
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }).then((res)=> {
      setTodoes([...todoes, res.data.data]);
    }).catch((e)=>{
      console.log(e);
    }).finally(()=> {setAddTaskActive(false); setLoading(false)})
  }; 

  const handleDeadlineChnage = (newValue: Dayjs) => {
    setFormData({ ...formData, deadline: newValue });
    setCalendarState({ isOpen: false, isSelected: true });
  };

  const handlePriorityChange = (value: number) => {
    setFormData({ ...formData, priority: +value });
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
          setFormData({ ...formData, subject: e.target.value })
        }
      />
      <div className={styles.options_wrapper}>
        <div className={styles.options_container}>
          <div className={styles.calendar_wrapper}>
            <div className={styles.options_icon_container}>
              {calendarState.isSelected ? <div className={styles.selected_wrapper}>
                <CalendarIcon />
                <span>{parseDeadlineToReadable(formData.deadline?.toDate().toString() ?? "")}</span>
                <button onClick={() => {
                  setCalendarState({ isOpen: false, isSelected: false })
                  setFormData({ ...formData, deadline: null })
                }}>&#10006;</button>
              </div> : <CalendarIcon
                cursor="pointer"
                handleClick={() => setCalendarState((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
              />}
              {!calendarState.isSelected && <Popover bg="black" content="Добавить дату выполнения" />}
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
              {priorityState.isSelected ? <div className={styles.selected_wrapper}>
                <PriorityStatic />
                <span>
                  <PriorityIcon color={priorityColors[formData.priority]} />
                  {formData.priority}
                </span>
                <button onClick={() => {
                  setPriorityState({ isOpen: false, isSelected: false })
                  setFormData({ ...formData, priority: 1 })
                }}>&#10006;</button>
              </div> : <PriorityStatic
                cursor="pointer"
                handleClick={() => setPriorityState((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
              />}
              {!priorityState.isSelected && <Popover bg="black" content="Добавить приоритет" />}
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
          <button disabled={loading} className={styles.cancel_btn} onClick={() => setAddTaskActive(false)}>Отмена</button>
          <button disabled={!formData.subject} className={styles.submit_btn} type="submit">
            {loading ?  <Loader size="s" color="secondary"/> : "Добавить"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskFrom;
