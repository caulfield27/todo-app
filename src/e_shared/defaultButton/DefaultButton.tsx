import Loader from '../loader/Loader';
import styles from './DefaultButton.module.css'

interface Props{
    disabled?: boolean,
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>)=> void,
    label: string,
    type: "cancel" | "submit"
    loading?: boolean
}

const DefaultButton = ({loading, type, disabled, handleClick, label} : Props) => {
    return <button
    type={type === 'cancel' ? "button" : "submit"}
    disabled={disabled ?? false}
    className={`${styles.btn} ${type === "cancel" ? styles.cancel_btn : styles.submit_btn}`}
    onClick={handleClick}
  >
    {type === 'submit' && loading ? <Loader size='xs' color="secondary"/> : label}
  </button>;
}
 
export default DefaultButton;