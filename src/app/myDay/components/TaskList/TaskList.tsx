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

const TaskList = () => {
  const [isTaskFormActive, setIsTaskFormActive] = useState(false);
  const [todoes, setTodoes] = useState<ITodoResponse[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getToken()
      .then((token) => {
        return strapi.get(apiUrl.getTodoes(getUserAttribute("id")), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => {
        setTodoes(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className={styles.task_list_section}>
      {isTaskFormActive ? (
        <AddTaskFrom todoes={todoes} setTodoes={setTodoes} setAddTaskActive={setIsTaskFormActive} />
      ) : (
        <div
          onClick={() => setIsTaskFormActive(true)}
          className={styles.add_task_btn}
          role="button"
        >
          <div className={styles.plus_wrapper}>
            <span className={styles.plus}>+</span>
          </div>
          <span className={styles.add_span}>Добавить задачу</span>
        </div>
      )}
      <div>
        {todoes.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <td className={styles.header_cell}>Название задачи</td>
              <td className={styles.header_cell}>Срок выполнения</td>
              <td className={styles.header_cell}>Приоритет</td>
            </thead>
            <tbody>
              {todoes.map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td className={styles.body_data}>{todo.subject}</td>
                    <td className={styles.body_data}>{todo.deadline && todo.deadline}</td>
                    <td className={styles.body_data}>{todo.priority}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </section>
  );
};

export default TaskList;
