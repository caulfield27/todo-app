"use client"
import styles from './AddTaskModal.module.css'
import '../../app/globals.css'
import dayjs from 'dayjs';
import AddTaskModalButton from '@/e_shared/addTaskModalButton/AddTaskModalButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { parseDay } from '@/utils/getDate';
import { useTaskStore } from '@/store/addTask/addTask';
import ExecutorModal from '../ExecutorModal/ExecutorModal';


const AddTaskModal = () => {
    const currentDay = parseDay(new Date())
    const [day, setDay] = useState(dayjs(currentDay))
    const [showCalendar, setShowCalendar] = useState(false)
    const completeDate = useTaskStore((state) => state.completeDate)
    const executor = useTaskStore((state) => state.executor)
    const priority = useTaskStore((state) => state.priority)
    const reminder = useTaskStore((state) => state.reminder)
    const setExecutorModal = useTaskStore((state) => state.setExecutorModal)
    const setCompleteDate = useTaskStore((state) => state.setCompleteDate)

    function passedDays(date: any) {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        return date < today
    }

    function handleDateChange(newValue: any) {
        const selectedDay = parseDay(newValue.$d)
        setDay(dayjs(selectedDay))
        setCompleteDate(selectedDay)
        setShowCalendar(false)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.addTask_conteiner}>
                <header className={styles.addTask_header}>
                    <input type="text" placeholder='Название задачи' />
                </header>
                <div className={styles.addTask_body}>
                    <input type="text" placeholder='описание' />
                </div>
                <footer className={styles.addTask_footer}>
                    <div className={styles.tags_container}>
                        <AddTaskModalButton label={completeDate}
                            handleClick={() => setShowCalendar((prev) => !prev)} />
                        <AddTaskModalButton label={executor} handleClick={() => setExecutorModal()} />
                        <AddTaskModalButton label={priority} handleClick={() => console.log('test')} />
                        <AddTaskModalButton label={reminder} handleClick={() => console.log('test')} />
                        <ExecutorModal />
                        <DateCalendar className={showCalendar ? styles.calendar : styles.display_none}
                            value={day} onChange={handleDateChange} shouldDisableDate={passedDays} />
                    </div>
                </footer>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" data-icon-name="priority-icon" data-priority="1"><path fill="currentColor" fill-rule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clip-rule="evenodd"></path>
                <path fill="currentColor" fill-rule="evenodd" d="M4.223 4.584A.5.5 0 0 0 4 5v14.5a.5.5 0 0 0 1 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0 0 20 13V4.5a.5.5 0 0 0-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084Z" clip-rule="evenodd"></path>
            </svg>
        </LocalizationProvider>

    );
}

export default AddTaskModal;