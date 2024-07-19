import { ReactNode } from 'react';
import styles from './AddTaskModalButton.module.css'

interface Props{
    label: string,
    handleClick: ()=> void
}

const AddTaskModalButton = ({label,handleClick}: Props) => {
    return (
        <div onClick={handleClick} className={styles.btn}>
            <span>{label}</span>
        </div>

     );
}
 
export default AddTaskModalButton;