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
import PriorityModal from '../PriorityModal/PriorityModal';


const AddTaskModal = () => {
    const currentDay = parseDay(new Date())
    const [day, setDay] = useState(dayjs(currentDay))
    const calendarModal = useTaskStore((state)=> state.calendarModal)
    const setCalendarModal = useTaskStore((state)=> state.setCalendarModal)
    const completeDate = useTaskStore((state) => state.completeDate)
    const executor = useTaskStore((state) => state.executor)
    const priority = useTaskStore((state) => state.priority)
    const setExecutorModal = useTaskStore((state) => state.setExecutorModal)
    const setCompleteDate = useTaskStore((state) => state.setCompleteDate)
    const setPriorityModal = useTaskStore((state)=> state.setPriorityModal)
    
    function passedDays(date: any) {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        return date < today
    }

    function handleDateChange(newValue: any) {
        const selectedDay = parseDay(newValue.$d)
        setDay(dayjs(selectedDay))
        setCompleteDate(selectedDay)
        setCalendarModal()
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.addTask_conteiner}>
                <header className={styles.addTask_header}>
                    <input type="text" placeholder='Название задачи' />
                </header>
                <div className={styles.addTask_body}>
                    <textarea placeholder='описание' />
                </div>
                <footer className={styles.addTask_footer}>
                    <div className={styles.tags_container}>
                        <AddTaskModalButton label={completeDate}
                            handleClick={() => setCalendarModal()} />
                        <AddTaskModalButton label={executor} handleClick={() => setExecutorModal()} />
                        <AddTaskModalButton label={priority} handleClick={() => setPriorityModal()} />
                        <ExecutorModal />
                        <DateCalendar className={calendarModal ? styles.calendar : styles.display_none}
                            value={day} onChange={handleDateChange} shouldDisableDate={passedDays} />
                        <PriorityModal/>
                    </div>
                    <div className={styles.buttons_container}>
                        <button className={`${styles.cancel_btn} ${styles.footer_btn}`}>Отмена</button>
                        <button className={`${styles.add_btn} ${styles.footer_btn}`}>Добавить</button>
                    </div>
                </footer>
            </div>
        </LocalizationProvider>

    );
}

export default AddTaskModal;