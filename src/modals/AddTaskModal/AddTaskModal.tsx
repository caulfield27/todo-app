import styles from './AddTaskModal.module.css'
import '../../app/globals.css'
import dayjs from 'dayjs';
import AddTaskModalButton from '@/e_shared/addTaskModalButton/AddTaskModalButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { parseDay, parseToSentense } from '@/utils/getDate';
import { useTaskStore } from '@/store/addTask/addTask';
import ExecutorModal from '../ExecutorModal/ExecutorModal';
import PriorityModal from '../PriorityModal/PriorityModal';
import {  postTodo } from '@/utils/api';
import { getFromStorage } from '@/utils/useLocaleStorage';


const AddTaskModal = () => {
    const currentDay = parseDay(new Date())
    const [day, setDay] = useState(dayjs(currentDay))
    const calendarModal = useTaskStore((state) => state.calendarModal)
    const completeDate = useTaskStore((state) => state.todo.completeDate)
    const executor = useTaskStore((state) => state.todo.executor)
    const priority = useTaskStore((state) => state.todo.priority)
    const taskName = useTaskStore((state) => state.todo.taskName)
    const taskDescription = useTaskStore((state) => state.todo.taskDescription)
    const setExecutorModal = useTaskStore((state) => state.setExecutorModal)
    const setCompleteDate = useTaskStore((state) => state.setCompleteDate)
    const setPriorityModal = useTaskStore((state) => state.setPriorityModal)
    const setCalendarModal = useTaskStore((state) => state.setCalendarModal)
    const setTaskName = useTaskStore((state) => state.setTaskName)
    const setTaskDescription = useTaskStore((state) => state.setDescription)
    const priorityModal = useTaskStore((state) => state.priorityModal)
    const executorModal = useTaskStore((state) => state.executorModal)
    const setTaskModal = useTaskStore((state) => state.setAddTaskModal)
    const addTaskModal = useTaskStore((state) => state.addTaskModal)
    const resetAll = useTaskStore((state) => state.resetAll)
    const todo = useTaskStore((state) => state.todo)
    const setTodo = useTaskStore((state) => state.setTodo)


    function passedDays(date: any) {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        return date < today
    }

    function handleDateChange(newValue: any) {
        const selectedDay = parseDay(newValue.$d)
        setDay(dayjs(selectedDay))
        let parseSelected = parseToSentense(selectedDay)
        setCompleteDate({ numbered: selectedDay, inWords: parseSelected })
        setCalendarModal()
    }

    function handleCalendarModal() {
        setCalendarModal()
        if (priorityModal) {
            setPriorityModal()
        } else if (executorModal) {
            setExecutorModal()
        } else if (priorityModal && executorModal) {
            setPriorityModal()
            setExecutorModal()
        }

    }

    function handleExecutorModal() {
        setExecutorModal()
        if (priorityModal) {
            setPriorityModal()
        } else if (calendarModal) {
            setCalendarModal()
        } else if (priorityModal && calendarModal) {
            setPriorityModal()
            setCalendarModal()
        }

    }
    function handlePriorityModal() {
        setPriorityModal()
        if (calendarModal) {
            setCalendarModal()
        } else if (executorModal) {
            setExecutorModal()
        } else if (calendarModal && executorModal) {
            setCalendarModal()
            setExecutorModal()
        }

    }

    function handleCancel() {
        setTaskModal(false)
        resetAll()
    }

    function handleAddTask() {
        const currentUser = getFromStorage('user')
        let request = { userId: currentUser[0].id, todo }
        postTodo(request, '/todoes')

    }

    const sendBtnDisable = !taskName

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={addTaskModal ? styles.addTask_conteiner : styles.display_none}>
                <header className={styles.addTask_header}>
                    <input type="text" placeholder='Название задачи' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </header>
                <div className={styles.addTask_body}>
                    <textarea placeholder='описание' value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                </div>
                <footer className={styles.addTask_footer}>
                    <div className={styles.tags_container}>
                        <AddTaskModalButton label={completeDate} id={1}
                            handleClick={handleCalendarModal} />
                        <AddTaskModalButton label={executor} handleClick={handleExecutorModal} id={2} />
                        <AddTaskModalButton label={priority} handleClick={handlePriorityModal} id={3} />
                        <ExecutorModal />
                        <DateCalendar className={calendarModal ? styles.calendar : styles.display_none}
                            value={day} onChange={handleDateChange} shouldDisableDate={passedDays} />
                        <PriorityModal />
                    </div>
                    <div className={styles.buttons_container}>
                        <button className={`${styles.cancel_btn} ${styles.footer_btn}`} onClick={handleCancel}>
                            Отмена
                        </button>
                        <button type='button' className={sendBtnDisable ? `${styles.disable_btn} ${styles.footer_btn}` : `${styles.add_btn} ${styles.footer_btn}`}
                            disabled={sendBtnDisable} onClick={handleAddTask}>
                            Добавить
                        </button>
                    </div>
                </footer>
            </div>
        </LocalizationProvider>

    );
}

export default AddTaskModal;