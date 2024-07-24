import { ReactNode } from 'react';
import styles from './AddTaskModalButton.module.css'
import { IPriority } from '@/modals/PriorityModal/PriorityModal';
import PriorityIcon from '../priorityIcon/PriorityIcon';

interface Props {
    label: string | IPriority,
    handleClick: () => void
}

const AddTaskModalButton = ({ label, handleClick }: Props) => {
    
    return (
        <div onClick={handleClick} className={styles.btn}>
            {typeof label === 'string' ? <span>{label}</span> :
                <div style={{display:'flex',flexDirection:'row', alignItems: 'center',gap:'5px'}}>
                    <PriorityIcon color={label.color} />
                    <span>
                        {label.name}
                    </span>

                </div>
            }

        </div>

    );
}

export default AddTaskModalButton;