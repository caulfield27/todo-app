import React from "react";
import styles from "./input.module.css";

interface Props {
  placeholder: string;
  value: string,
  label?: string;
  type?: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur?: (Event: React.FocusEvent<HTMLInputElement>) => void;
  validation?: { isError: boolean; message: string };
}

const Input = ({
  placeholder,
  value,
  label,
  type,
  name,
  handleChange,
  handleBlur,
  handleFocus,
  validation
}: Props) => {
  return (
    <div className={styles.input_container}>
      <div className={styles.input_wrapper}>
        {label && <label htmlFor={label}>{label}</label>}
        <input
          value={value}
          name={name}
          type={type ?? "text"}
          id={label}
          placeholder={placeholder}
          onFocus={handleFocus ? handleFocus : () => {}}
          onChange={handleChange}
          onBlur={handleBlur ? handleBlur : () => {}}
        />
      </div>
      {validation && validation.isError && <span>{validation.message}</span>}
    </div>
  );
};

export default Input;
