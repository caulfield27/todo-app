import styles from './AddTaskModalButton.module.css'
import { IPriority } from '@/modals/PriorityModal/PriorityModal';
import PriorityIcon from '../priorityIcon/PriorityIcon';
import { ICompleteDate, useTaskStore } from '@/store/addTask/addTask';

interface Props {
    label: any,
    handleClick: (e:any) => void,
    id:number
}

const AddTaskModalButton = ({ label, handleClick , id}: Props) => {
    const resetDate = useTaskStore((state)=> state.resetDate)
    const resetExecutor = useTaskStore((state)=> state.resetExecutor)
    const resetPriority = useTaskStore((state)=> state.resetPriority)

    function showCloseBtn(){
        return label === "Срок выполнения" || label === "Исполнитель" || label === "Приоритет"
    }

    if(!showCloseBtn()){
        handleClick = ()=> {return}
    }

    function handleClose(){
        if(id === 1){
            resetDate()
        }else if(id === 2){
            resetExecutor()
        }else if(id === 3){
            resetPriority()
        }
    }
    
    
    return (
        <div onClick={handleClick} className={styles.btn}>
            {typeof label === 'string' ? <span>{label}</span> : label.hasOwnProperty('name') ?  
                <div style={{display:'flex',flexDirection:'row', alignItems: 'center',gap:'5px'}}>
                    <PriorityIcon color={label.color} />
                    <span>
                        {label.name}
                    </span>

                </div> :
                <span>{label.inWords}</span> 
            } 
            <button className={showCloseBtn() ? styles.display_none : styles.close_btn}
            onClick={handleClose}>
                &#10006;
            </button>

        </div>

    );
}

export default AddTaskModalButton;