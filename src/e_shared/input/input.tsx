import styles from './input.module.css'

interface Props{
    placeholder: string,
    label: string,
    type: string,
    name: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>)=> void
}

const Input = ({placeholder,label,type, name, handleChange}: Props) => {
    return ( 
        <div className={styles.input_wrapper}>
            <label htmlFor={label}>{label}</label>
            <input name={name} type={type} 
            id={label} placeholder={placeholder} onChange={handleChange}/>
        </div>
    );
}
 
export default Input;