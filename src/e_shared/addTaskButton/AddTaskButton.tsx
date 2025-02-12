import React from "react";
import styles from "./AddTaskButton.module.css";
import { useGlobalStore } from "@/store/global/global";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddTaskButton = () => {
  const { isMobile } = useGlobalStore();
  return (
    <div className={styles.add_task_btn_wrap}>
      <AddCircleIcon style={{color: "#23e0c7", fontSize: "30px"}}/>
      {!isMobile && <span>Добавить задачу</span>}
    </div>
  );
};

export default AddTaskButton;
