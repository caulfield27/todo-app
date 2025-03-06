"use client";
import { getUserAttribute } from "@/utils/getUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./AddTaskForm.module.css";
import "../../app/globals.css";
import Calendar from "../calendar/Calendar";
import dayjs, { Dayjs } from "dayjs";
import { parseDay, parseDeadlineToReadable } from "@/utils/getDate";
import { CalendarIcon } from "@/icons/calendarIcon/CalendarIcon";
import PriorityStatic from "@/icons/priorityIcon/PriorityStatic";
import PriorityModal from "@/modals/priorityModal/PriorityModal";
import Popover from "../popover/Popover";
import PriorityIcon from "@/icons/priorityIcon/PriorityIcon";
import { getToken } from "@/utils/getToken";
import { strapi } from "../api";
import { apiUrl } from "@/routes";
import { ITodoResponse } from "../types/types";
import { priorityColors } from "../constants/priority";
import CategoryIcon from "@/icons/categoryIcon/CategoryIcon";
import CategoryModal from "@/modals/categoryModal/CategoryModal";
import { ICategoryList } from "../constants/categories";
import InterestsIcon from "@mui/icons-material/Interests";
import DefaultButton from "../defaultButton/DefaultButton";

interface IFormData {
  subject: string;
  isExpired: boolean;
  isCompleted: boolean;
  deadline: null | Dayjs;
  userId: number | null;
  priority: number;
  category: ICategoryList;
}

interface IOptionsState {
  isOpen: boolean;
  isSelected: boolean;
}

interface Props {
  isModal: boolean,
  setAddTaskActive: Dispatch<SetStateAction<boolean>>;
  todoes?: ITodoResponse[] | [];
  setTodoes?: Dispatch<SetStateAction<ITodoResponse[] | []>>;
  setInfoModal: Dispatch<
    SetStateAction<{
      isActive: boolean;
      message: string;
      type: "success" | "error";
    }>
  >;
  type: "today" | "upcoming" | "completed" | "important" | "all";
}

const AddTaskFrom = ({ setAddTaskActive, todoes, setTodoes, setInfoModal, type, isModal }: Props) => {
  const [formData, setFormData] = useState<IFormData>({
    subject: "",
    isExpired: false,
    isCompleted: false,
    deadline: dayjs(new Date()),
    userId: null,
    priority: 1,
    category: {
      label: {
        text: "Другое",
        icon: () => <InterestsIcon />,
      },
      value: "others",
    },
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
  const [categoryState, setCategoryState] = useState<IOptionsState>({
    isOpen: false,
    isSelected: false,
  });

  useEffect(() => {
    setFormData({ ...formData, userId: getUserAttribute("id") });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getToken()
      .then((token) => {
        setLoading(true);
        return strapi.post(
          apiUrl.postTodoes,
          {
            data: {
              ...formData,
              deadline: formData.deadline
                ? parseDay(formData.deadline?.toDate() + "")
                : formData.deadline,
              category: formData.category.value,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then((res) => {
        if (res.data?.data?.deadline !== parseDay(new Date().toString())) {
          if (type === "today") {
            setInfoModal({
              isActive: true,
              message: `Задача успешно добавлена в "Предстоящие"`,
              type: "success",
            });
          } else {
            if(setTodoes && todoes){
              setTodoes([...todoes, res.data.data]);
            }
            setInfoModal({ isActive: true, message: "Задача успешно добавлена.", type: "success" });
          }
        } else {
          if (type === "upcoming") {
            setInfoModal({
              isActive: true,
              message: `Задача успешно добавлена в "Мой день"`,
              type: "success",
            });
          } else {
            if(setTodoes && todoes){
              setTodoes([...todoes, res.data.data]);
            }
            setInfoModal({ isActive: true, message: "Задача успешно добавлена.", type: "success" });
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setInfoModal({
          isActive: true,
          message: "Не удалось добавить задачу, попробуйте ещё раз.",
          type: "error",
        });
      })
      .finally(() => {
        setAddTaskActive(false);
        setLoading(false);
      });
  };

  const handleDeadlineChnage = (newValue: Dayjs) => {
    setFormData({ ...formData, deadline: newValue });
    setCalendarState({ isOpen: false, isSelected: true });
  };

  const handlePriorityChange = (value: number) => {
    setFormData({ ...formData, priority: +value });
    setPriorityState({ isOpen: false, isSelected: true });
  };

  const handleCategoryChange = (val: ICategoryList) => {
    setFormData({ ...formData, category: val });
    setCategoryState({ isOpen: false, isSelected: true });
  };

  
  return (
    <form className={isModal ? styles.modal_form : styles.form} onSubmit={handleSubmit}>
      <input
        autoFocus
        className={styles.input}
        type="text"
        placeholder="Добавить задачу"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, subject: e.target.value })
        }
      />
      <div className={isModal ? styles.options_wrapper_modal : styles.options_wrapper}>
        <div className={styles.options_container}>
          <div className={styles.calendar_wrapper}>
            <div className={styles.options_icon_container}>
              {calendarState.isSelected ? (
                <div className={styles.selected_wrapper}>
                  <CalendarIcon />
                  <span>
                    {parseDeadlineToReadable(formData.deadline?.toDate().toString() ?? "")}
                  </span>
                  <button
                    onClick={() => {
                      setCalendarState({ isOpen: false, isSelected: false });
                      setFormData({ ...formData, deadline: null });
                    }}
                  >
                    &#10006;
                  </button>
                </div>
              ) : (
                <CalendarIcon
                  cursor="pointer"
                  handleClick={() =>
                    setCalendarState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
                  }
                />
              )}

              {!calendarState.isSelected && !calendarState.isOpen && (
                <Popover
                  arrow="top"
                  classes={styles["popover_position"]}
                  bg="black"
                  content="Добавить дату выполнения"
                />
              )}
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
              {priorityState.isSelected ? (
                <div className={styles.selected_wrapper}>
                  <PriorityStatic />
                  <span>
                    <PriorityIcon color={priorityColors[formData.priority]} />
                    {formData.priority}
                  </span>
                  <button
                    onClick={() => {
                      setPriorityState({ isOpen: false, isSelected: false });
                      setFormData({ ...formData, priority: 1 });
                    }}
                  >
                    &#10006;
                  </button>
                </div>
              ) : (
                <PriorityStatic
                  cursor="pointer"
                  handleClick={() =>
                    setPriorityState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
                  }
                />
              )}
              {!priorityState.isSelected && !priorityState.isOpen && (
                <Popover
                  classes={styles["popover_position"]}
                  arrow="top"
                  bg="black"
                  content="Добавить приоритет"
                />
              )}
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
          <div className={styles.category_wrapepr}>
            {categoryState.isSelected ? (
              <div className={styles.selected_wrapper}>
                {formData.category.label.icon()}
                <span>{formData.category.label.text}</span>
                <button
                  onClick={() => {
                    setCategoryState({ isOpen: false, isSelected: false });
                    setFormData({
                      ...formData,
                      category: {
                        label: {
                          text: "Другое",
                          icon: () => <InterestsIcon />,
                        },
                        value: "others",
                      },
                    });
                  }}
                >
                  &#10006;
                </button>
              </div>
            ) : (
              <div className={styles.category_options_container}>
                <CategoryIcon
                  cursor="pointer"
                  handleCLick={() =>
                    setCategoryState((prev) => ({
                      isOpen: !prev.isOpen,
                      isSelected: prev.isSelected,
                    }))
                  }
                />
                {!categoryState.isSelected && !categoryState.isOpen && (
                  <Popover
                    classes={styles["popover_position"]}
                    arrow="top"
                    bg="black"
                    content="Добавить категорию задачи"
                  />
                )}
              </div>
            )}
            {categoryState.isOpen && (
              <CategoryModal
                value={formData.category.value}
                handleChange={handleCategoryChange}
                setCategoryState={setCategoryState}
                classes={styles["category_dropdown"]}
              />
            )}
          </div>
        </div>
        <div className={styles.controll_buttons_wrapper}>
          <DefaultButton
            disabled={loading}
            label="Отмена"
            handleClick={() => setAddTaskActive(false)}
            type="cancel"
          />
          <DefaultButton
            disabled={!formData.subject}
            label="Добавить"
            type="submit"
            loading={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default AddTaskFrom;
