import AddTaskFrom from "@/e_shared/addTaskForm/AddTaskForm";
import styles from "./TaskList.module.css";
import "../../../globals.css";
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
import { dottedDayFormat } from "@/utils/getDate";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const TaskList = () => {
  const [isTaskFormActive, setIsTaskFormActive] = useState(false);
  const [todoes, setTodoes] = useState<ITodoResponse[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [completeLoding, setCompleteLoading] = useState({
    loading: false,
    id: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    setLoading(true);
    getToken()
      .then((token) => {
        if (token) {
          setToken(token);
          return strapi.get(apiUrl.getTodoes(getUserAttribute("id")), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      })
      .then((res) => {
        setTodoes(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleTaskComplete(documentId: string, index: number) {
    const data = {
      data: {
        isCompleted: true,
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
        if(res.status === 200){
          const newTodoes = [...todoes];
          newTodoes[index] = {...newTodoes[index], ...res.data.data};
          setTodoes(newTodoes);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setCompleteLoading((prev) => ({ ...prev, loading: false }));
      });
  }

  function handleDelete(documentId: string) {
    Swal.fire({
      icon: "warning",
      title: "Вы действительно хотите удалить задачу?",
      showCancelButton: true,
      confirmButtonText: "Удалить",
      confirmButtonColor: "#d30808",
      cancelButtonText: "Отмена",
    }).then((res) => {
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
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }

  return (
    <main className={styles.task_list_section}>
      {isTaskFormActive ? (
        <AddTaskFrom todoes={todoes} setTodoes={setTodoes} setAddTaskActive={setIsTaskFormActive} />
      ) : (
        <div
          onClick={() => setIsTaskFormActive(true)}
          className={styles.add_task_btn}
          role="button"
        >
          <AddIcon className={styles.add_sign} fontSize="medium" />
          <span className={styles.add_span}>Добавить задачу</span>
        </div>
      )}
      <section className={styles.table_container}>
        {loading ? (
          <Loader size="l" />
        ) : todoes.length > 0 ? (
          <table className={styles.table}>
            <thead className={styles.table_header}>
              <tr>
                <td className={styles.btn_cell}></td>
                <td className={styles.header_cell}>Название задачи</td>
                <td className={styles.header_cell}>Срок выполнения</td>
                <td className={styles.header_cell}>Приоритет</td>
                <td className={styles.actions_cell}>Действия</td>
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {todoes.map((todo, ind) => {
                return (
                  <tr key={todo.id}>
                    <td className={styles.btn_cell}>
                      <button
                        className={
                          completeLoding.loading && completeLoding.id === todo.documentId
                            ? styles.loading
                            : todo.isCompleted
                            ? styles.completed
                            : ""
                        }
                        onClick={() => handleTaskComplete(todo.documentId, ind)}
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
                    <td className={styles.body_data}>
                      {todo.isCompleted ? <s>{todo.subject}</s> : todo.subject}
                    </td>
                    <td className={styles.body_data}>
                      {todo.deadline && dottedDayFormat(todo.deadline)}
                    </td>
                    <td className={styles.body_data}>
                      <div className={styles.priority_cell}>
                        {<PriorityIcon color={priorityColors[todo.priority]} />}{" "}
                        <span>{todo.priority}</span>
                      </div>
                    </td>
                    <td className={styles.actions_cell}>
                      <button className={styles.edit_btn}>
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
