import PriorityIcon from '@/e_shared/priorityIcon/PriorityIcon';
import styles from './PriorityModal.module.css'
import { useTaskStore } from '@/store/addTask/addTask';

const priorities = [
    {
        name: 'Высокий',
        color: '#F22B2B',
    },
    {
        name: 'Средний',
        color: '#F6FF70',
    },
    {
        name: 'Низкий',
        color: '#8AEF7A',
    },

]

export interface IPriority{
    name: string,
    color: string
}

const PriorityModal = () => {
    const priorityModal = useTaskStore((state)=> state.priorityModal)
    const setPriority = useTaskStore((state)=> state.setPriority)
    const setPriorityModal = useTaskStore((state)=> state.setPriorityModal)

    function handlePriority(priority: IPriority){
        setPriority(priority)
        setPriorityModal()
    }
    
    return ( 
        <div className={priorityModal ? styles.priority_modal_container : styles.display_none}>
            {priorities.map((priority)=>{
                return <div className={styles.priority_wrap} onClick={()=>handlePriority(priority)}>
                    <PriorityIcon color={priority.color}/>
                    <span>{priority.name}</span>
                </div>
            })}
        </div>

     );
}
 
export default PriorityModal;
