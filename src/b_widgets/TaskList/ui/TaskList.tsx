"use client";
import AddTaskFrom from "@/e_shared/addTaskForm/AddTaskForm";
import styles from "./TaskList.module.css";
import "../../../app/globals.css";
import { useEffect, useState } from "react";
import { ITodoResponse } from "@/e_shared/types/types";
import { strapi } from "@/e_shared/api";
import { apiUrl } from "@/routes";
import { getUserAttribute } from "@/utils/getUser";
import { getToken } from "@/utils/getToken";
import Loader from "@/e_shared/loader/Loader";
import AddIcon from "@mui/icons-material/Add";
import PriorityIcon from "@/icons/priorityIcon/PriorityIcon";
import { priorityColors } from "@/e_shared/constants/priority";
import { dottedDayFormat, parseDay } from "@/utils/getDate";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import InfoModal from "@/modals/infoModal/InfoModal";
import { categoryIcons } from "@/e_shared/constants/categories";
import UpdateTaskModal from "@/modals/updateTaskModal/UpdateTaskModal";
import Sorting from "@/e_shared/sorting/Sorting";
import { allSortingOptions, sortingOptions } from "../config";
import { sliceRest } from "@/utils/parseString";
import { useGlobalStore } from "@/store/global/global";
import Filters from "@/e_shared/filters/Filters";
import { getTodoes } from "../api";

interface Props {
  type: "today" | "upcoming" | "completed" | "important" | "all";
}

const TaskList = ({ type }: Props) => {
  const [isTaskFormActive, setIsTaskFormActive] = useState(false);
  const [todoes, setTodoes] = useState<ITodoResponse[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [updateModalState, setUpdateModalState] = useState({
    isActive: false,
    index: 0,
  });
  const [completeLoding, setCompleteLoading] = useState({
    loading: false,
    id: "",
  });
  const [token, setToken] = useState("");
  const { snackBar, setSnackBar } = useGlobalStore();

  useEffect(() => {
    setLoading(true);
    getToken()
      .then((token) => {
        if (token) {
          setToken(token);
          getTodoes(token, type, setTodoes, setLoading);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleTaskComplete(documentId: string, index: number, isCompleted: boolean) {
    const data = {
      data: {
        isCompleted: !isCompleted,
      },
    };
    setCompleteLoading({ loading: true, id: documentId });
    strapi
      .put(apiUrl.updateTodo(documentId), data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const newTodoes = [...todoes];
          newTodoes[index] = { ...newTodoes[index], ...res.data.data };
          setTodoes(newTodoes);
          setSnackBar({
            isActive: true,
            message: isCompleted ? "Задача снова активна!" : "Поздравляю, Вы выполнили задачу!",
            type: "success",
          });
        }
      })
      .catch((e) => {
        setSnackBar({ isActive: true, message: "Ошибка!", type: "error" });
        console.log(e);
      })
      .finally(() => {
        setCompleteLoading((prev) => ({ ...prev, loading: false }));
      });
  }

  function handleDelete(documentId: string) {
    document.body.style.overflowY = "hidden";
    Swal.fire({
      icon: "warning",
      title: "Вы действительно хотите удалить задачу?",
      showCancelButton: true,
      confirmButtonText: "Удалить",
      confirmButtonColor: "#d30808",
      cancelButtonText: "Отмена",
    })
      .then((res) => {
        if (res.isConfirmed) {
          strapi
            .delete(apiUrl.updateTodo(documentId), {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 204) {
                const updatedTodoes = todoes.filter((todo) => todo.documentId !== documentId);
                setTodoes(updatedTodoes);
                setSnackBar({
                  isActive: true,
                  message: "Задача успешно удалена.",
                  type: "success",
                });
              }
            })
            .catch((e) => {
              setSnackBar({
                isActive: true,
                message: "Не удалось удалить задачу, попробуйте заново",
                type: "error",
              });
              console.log(e);
            });
        }
      })
      .finally(() => (document.body.style.overflowY = "visible"));
  }

  const handleFiltersChange = (
    query: string | { from: string; to: string },
    filterType: "category" | "deadline" | "priority"
  ) => {
    setLoading(true);
    let responseQuery;
    switch (filterType) {
      case "category":
        responseQuery = `&filters[category]=${query}`;
        break;
      case "priority":
        responseQuery = `&filters[priority]=${query}`;
        break;
      case "deadline":
        if (typeof query === "object") {
          responseQuery = `&filters[deadline][$gt]=${query.from}&filters[deadline][$lt]=${query.to}`;
        }
    }
    const curDay = parseDay(new Date().toDateString());
    const deadlineQuery = `${
      type !== "completed" ? "&filters[isCompleted]=false" : "&filters[isCompleted]=true"
    }${type === "today" ? "&filters[deadline]=" + curDay : ""}${
      type === "upcoming" ? "&filters[deadline][$gt]=" + curDay : ""
    }`;
    const res = deadlineQuery.concat(responseQuery ?? "");
    strapi
      .get(apiUrl.getFilteredTodoes(res, getUserAttribute("id")), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.data) {
          setTodoes(res?.data?.data);
        }
      })
      .catch((e) => {
        console.log(e);
        setSnackBar({ isActive: true, type: "error", message: "Не удалось применить фильтр." });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className={styles.task_list_section}>
      {updateModalState.isActive && (
        <UpdateTaskModal
          type={type}
          setSnackbar={setSnackBar}
          modalState={updateModalState}
          setModalState={setUpdateModalState}
          todoes={todoes}
          setTodoes={setTodoes}
        />
      )}
      {snackBar.isActive && <InfoModal modalState={snackBar} setModalState={setSnackBar} />}
      {isTaskFormActive ? (
        <AddTaskFrom
          isModal={false}
          type={type}
          setSnackbar={setSnackBar}
          todoes={todoes}
          setTodoes={setTodoes}
          setAddTaskActive={setIsTaskFormActive}
        />
      ) : (
        <div className={styles.taskList_header_wrapper}>
          <div
            onClick={() => setIsTaskFormActive(true)}
            className={styles.add_task_btn}
            role="button"
          >
            <AddIcon className={styles.add_sign} fontSize="medium" />
            <span className={styles.add_span}>Добавить задачу</span>
          </div>
          <div className={styles.filters_wrapper}>
            <Filters
              onReset={() => getTodoes(token, type, setTodoes, setLoading)}
              onChange={handleFiltersChange}
              type={type}
              disabled={todoes.length < 2}
            />
              <Sorting
                options={type === "today" ? sortingOptions : allSortingOptions}
                todoes={todoes}
                setTodoes={setTodoes}
                onReset={() => getTodoes(token, type, setTodoes, setLoading)}
                disabled={todoes.length < 2}
              />
          </div>
        </div>
      )}
      <section className={styles.table_container}>
        {loading ? (
          <Loader classes={styles.loader_container} size="l"/>
        ) : todoes.length > 0 ? (
          <table className={styles.table}>
            <thead className={styles.table_header}>
              <tr>
                <td className={styles.btn_cell}></td>
                <td className={styles.header_cell}>Название задачи</td>
                <td className={`${styles.header_cell} ${styles.adaptive_view}`}>Дедлайн</td>
                <td className={`${styles.header_cell} ${styles.adaptive_view}`}>Приоритет</td>
                <td className={styles.actions_cell}>Действия</td>
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {todoes.map((todo, ind) => {
                const slicedTask = sliceRest(todo.subject, 20);
                return (
                  <tr key={todo.id}>
                    <td className={styles.btn_cell}>
                      <button
                        className={
                          completeLoding.loading && completeLoding.id === todo.documentId
                            ? styles.loading
                            : todo.isCompleted
                            ? styles.completed
                            : todo.isExpired
                            ? styles.expired_state
                            : ""
                        }
                        onClick={() => handleTaskComplete(todo.documentId, ind, todo.isCompleted)}
                      >
                        <span
                          className={
                            todo.isCompleted ? styles.copleted_checkmark : styles.checkmark
                          }
                        >
                          &#10003;
                        </span>
                      </button>
                    </td>
                    <td className={`${styles.body_data} ${styles.body_data_name}`}>
                      {todo.isCompleted || todo.isExpired ? (
                        <s style={!todo.isCompleted && todo.isExpired ? { color: "red" } : {}}>
                          {slicedTask}
                        </s>
                      ) : (
                        slicedTask
                      )}
                      {categoryIcons[todo.category][0] ?? ""}
                      {!todo.isCompleted && todo.isExpired ? (
                        <span className={styles.expired_span}>просрочено</span>
                      ) : null}
                    </td>
                    <td className={`${styles.body_data} ${styles.adaptive_view}`}>
                      {todo.deadline && dottedDayFormat(todo.deadline)}
                    </td>
                    <td className={`${styles.body_data} ${styles.adaptive_view}`}>
                      <div className={styles.priority_cell}>
                        {<PriorityIcon color={priorityColors[todo.priority]} />}{" "}
                        <span>{todo.priority}</span>
                      </div>
                    </td>
                    <td className={styles.actions_cell}>
                      <button
                        className={styles.edit_btn}
                        onClick={() =>
                          setUpdateModalState((prev) => ({
                            isActive: !prev.isActive,
                            index: ind,
                          }))
                        }
                      >
                        <ModeEditIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(todo.documentId)}
                        className={styles.delete_btn}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </section>
    </main>
  );
};

export default TaskList;
