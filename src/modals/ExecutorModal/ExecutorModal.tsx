import { useTaskStore } from '@/store/addTask/addTask';
import styles from './ExecutorModal.module.css'
import { useState } from 'react';

export interface Props {

}

const ExecutorModal = () => {
    const setExecutor = useTaskStore((state) => state.setExecutor)
    const [ tempExecutor, setTempExecutor] = useState('')
    const executorModal = useTaskStore((state)=> state.executorModal)
    const setExecutorModal = useTaskStore((state)=> state.setExecutorModal)

    function handleExecutor(){
        setExecutor(tempExecutor)
        setExecutorModal()
    }
    
    return (
        <div className={executorModal ? styles.executor_modal_container : styles.display_none}>
            <input type="text" onChange={(e) => setTempExecutor(e.target.value)} placeholder='Введите имя исполнителя'/>
            <button className={tempExecutor ? styles.active_btn : styles.disable_btn} 
            disabled={!tempExecutor} onClick={handleExecutor}>&#10003;</button>
        </div>
    );
}

export default ExecutorModal;