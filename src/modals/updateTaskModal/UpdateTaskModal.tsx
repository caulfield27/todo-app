import { createPortal } from "react-dom";
import styles from "./UpdateTaskModal.module.css";
import { ITodoResponse } from "@/e_shared/types/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { parseDeadlineToReadable } from "@/utils/getDate";
import Calendar from "@/e_shared/calendar/Calendar";
import DefaultButton from "@/e_shared/defaultButton/DefaultButton";
import PriorityIcon from "@/icons/priorityIcon/PriorityIcon";
import { priorityColors } from "@/e_shared/constants/priority";
import { categoryIcons, ICategoryList } from "@/e_shared/constants/categories";
import PriorityModal from "../priorityModal/PriorityModal";
import CategoryModal from "../categoryModal/CategoryModal";

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
  const [loading, setLoading] = useState(false);
  const [calendarState, setCalendarState] = useState({
    isOpen: false,
    isSelected: false,
  });
  const [categoryState, setCategoryState] = useState({
    isOpen: false,
    isSelected: false,
  });
  const [priorityState, setPriorityState] = useState({
    isOpen: false,
    isSelected: false,
  });
  const [updatedTodo, setUpdatedTodo] = useState({
    subject: currentTodo.subject,
    isExpired: currentTodo.isExpired,
    deadline: dayjs(
      typeof currentTodo.deadline === "string" ? new Date(currentTodo.deadline) : new Date()
    ),
    priority: currentTodo.priority,
    category: currentTodo.category,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updatedTodo);
  };

  const closeAllBut = (type: "category" | "calendar" | "priority")=>{
    switch(type){
      case "calendar":
        setCategoryState(prev=> ({...prev, isOpen: false}));
        setPriorityState(prev=> ({...prev, isOpen: false}));
        break;
      case "category":
        setCalendarState(prev=> ({...prev, isOpen: false}));
        setPriorityState(prev=> ({...prev, isOpen: false}));
        break;
      case "priority":
        setCategoryState(prev=> ({...prev, isOpen: false}));
        setCalendarState(prev=> ({...prev, isOpen: false}));
        break;
    }
  }

  return createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <header>
          <button
            onClick={() => setModalState((prev) => ({ ...prev, isActive: false }))}
            className={styles.close_btn}
          >
            &#10006;
          </button>
        </header>
        <form onSubmit={handleSubmit} className={styles.modal_body}>
          <div className={styles.option_wrapper}>
            <span className={styles.label_span}>Название задачи</span>
            <textarea
              className={styles.option}
              value={updatedTodo.subject}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setUpdatedTodo((prev) => ({ ...prev, subject: e.target.value }))
              }
            />
          </div>
          <div className={`${styles.option_wrapper} ${styles.deadline_wrapper}`}>
            <span className={styles.label_span}>Срок задачи</span>
            <div
              role="button"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                closeAllBut("calendar");
                setCalendarState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
              }}
              className={`${styles.option} ${styles.deadline_option}`}
            >
              <span>{parseDeadlineToReadable(updatedTodo.deadline.toDate().toDateString())}</span>
            </div>
            {calendarState.isOpen && (
              <Calendar
                classes={styles.calendar}
                value={!updatedTodo.isExpired ? updatedTodo.deadline : dayjs(new Date())}
                handleChange={(newDate: Dayjs) => {
                  setUpdatedTodo((prev) => ({ ...prev, deadline: newDate }));
                  setCalendarState({ isOpen: false, isSelected: true });
                }}
                setIsOpen={setCalendarState}
              />
            )}
          </div>
          <div style={{position: "relative"}} className={styles.option_wrapper}>
            <span className={styles.label_span}>Приоритет</span>
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                closeAllBut("priority");
                setPriorityState(prev=> ({...prev, isOpen: !prev.isOpen}));
              }}
              role="button"
              className={`${styles.option} ${styles.priority_options}`}
            >
              <PriorityIcon color={priorityColors[updatedTodo.priority]} />
            </div>
            {priorityState.isOpen && (
              <PriorityModal
                setIsOpen={setPriorityState}
                value={updatedTodo.priority}
                handleChange={(value: number) => {
                  setPriorityState({ isOpen: false, isSelected: true });
                  setUpdatedTodo((prev) => ({ ...prev, priority: value }));
                }}
                classes={styles["priority_modal_container"]}
              />
            )}
          </div>
          <div style={{position: "relative"}} className={styles.option_wrapper}>
            <span className={styles.label_span}>Категория</span>
            <div
              role="button"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                closeAllBut("category");
                setCategoryState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
              }}
              className={`${styles.option} ${styles.category_option}`}
            >
              {categoryIcons[updatedTodo.category][0]}
              <span>{categoryIcons[updatedTodo.category][1]}</span>
            </div>
            {categoryState.isOpen && (
              <CategoryModal
                classes={styles["category_modal_container"]}
                value={updatedTodo.category}
                setCategoryState={setCategoryState}
                handleChange={(category: ICategoryList) => {
                  setCategoryState({ isOpen: false, isSelected: true });
                  setUpdatedTodo((prev) => ({ ...prev, category: category.value }));
                }}
              />
            )}
          </div>
          <footer className={styles.footer}>
            <DefaultButton
              disabled={loading}
              type="cancel"
              label="Отмена"
              handleClick={() => setModalState((prev) => ({ ...prev, isActive: false }))}
            />
            <DefaultButton
              disabled={!updatedTodo.subject}
              loading={loading}
              type="submit"
              label="Сохранить"
            />
          </footer>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UpdateTaskModal;
