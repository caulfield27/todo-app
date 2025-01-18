import React from "react";
import styles from "./OtpInput.module.css";

interface Props {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  validation?: { isError: boolean; message: string };
}

const OtpInput = ({ value, handleChange, handleBlur, handleFocus, validation }: Props) => {
  return (
    <div className={styles.otp_input_wrapper}>
      <input
        autoFocus={true}
        className={styles.otp_input}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur ? handleBlur : () => {}}
        onFocus={handleFocus ? handleFocus : () => {}}
        type="text"
      />
      {validation?.isError && <span>{validation.message}</span>}
    </div>
  );
};

export default OtpInput;
