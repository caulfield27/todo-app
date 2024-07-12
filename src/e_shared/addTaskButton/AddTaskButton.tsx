import React from 'react';
import styles from './AddTaskButton.module.css'

const AddTaskButton = () => {
    return ( 
        <div className={styles.add_task_btn_wrap}>
            <img src="/add_btn.png" alt="add button"/>
            <span>Добавить задачу</span>
        </div>
    );
}
 
export default AddTaskButton;