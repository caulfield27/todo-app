import { createPortal } from "react-dom";
import styles from "./UpdateTaskModal.module.css";
import { ITodoResponse } from "@/e_shared/types/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { CalendarIcon } from "@/icons/calendarIcon/CalendarIcon";
import { parseDeadlineToReadable } from "@/utils/getDate";
import Calendar from "@/e_shared/calendar/Calendar";

interface Props {
  modalState: {
    isActive: boolean;
    index: number;
  };
  todoes: ITodoResponse[];
  setModalState: Dispatch<
    SetStateAction<{
      isActive: boolean;
      index: number;
    }>
  >;
  setTodoes: Dispatch<SetStateAction<ITodoResponse[]>>;
}

const UpdateTaskModal = ({ todoes, modalState, setModalState, setTodoes }: Props) => {
  const currentTodo = todoes[modalState.index];
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [calendarState, setCalendarState] = useState({
    isOpen: false,
    isSelected: false,
  })
  const [updatedTodo, setUpdatedTodo] = useState({
    subject: currentTodo.subject,
    isExpired: currentTodo.isExpired,
    isCompleted: currentTodo.isCompleted,
    deadline:  dayjs(
        typeof currentTodo.deadline === "string" ? new Date(currentTodo.deadline) : new Date()
      ),
    priority: currentTodo.priority,
    category: currentTodo.category,
  });

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalState({ isActive: false, index: 0 });
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return createPortal(
    <div className={styles.modal_container}>
      <div ref={modalRef} className={styles.modal}>
        <input
          type="text"
          value={updatedTodo.subject}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUpdatedTodo((prev) => ({ ...prev, subject: e.target.value }))
          }
        />
        <div>
            <CalendarIcon/>
            <span>{parseDeadlineToReadable(updatedTodo.deadline.toDate().toDateString())}</span>
            {calendarState.isOpen && <Calendar value={updatedTodo.deadline} handleChange={(newDate: Dayjs)=>{
                setUpdatedTodo(prev => ({...prev, deadline: newDate}));
                setCalendarState({isOpen: false, isSelected:true});
            }} setIsOpen={setCalendarState}/>}
        </div>
        <div>
            
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UpdateTaskModal;
