"use client";
import { getUserName } from "@/utils/getUser";
import { useEffect, useState } from "react";
import styles from "./AddTaskForm.module.css";
import "../../app/globals.css";
import PriorityIcon from "../priorityIcon/PriorityIcon";
import Calendar from "../calendar/Calendar";
import dayjs, {Dayjs} from "dayjs";
import { parseDay } from "@/utils/getDate";

const AddTaskFrom = () => {
  const [formData, setFormData] = useState({
    subject: "",
    isExpired: false,
    isCompleted: false,
    deadline: dayjs(parseDay(new Date().toString())),
    userName: "",
    priority: 1,
  });

  useEffect(() => {
    setFormData({ ...formData, ["userName"]: getUserName() });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDeadlineChnage = (newValue: Dayjs)=>{
    setFormData({...formData, ['deadline'] : newValue})
  }

  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input autoFocus className={styles.input} type="text" placeholder="Добавить задачу" />
      <div>
        <div>
          <Calendar handleChange={handleDeadlineChnage} value={formData.deadline}/>
        </div>
        <div>
          <button className={styles.submit_btn} type="submit">
            Создать
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskFrom;
