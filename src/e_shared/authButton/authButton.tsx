import Loader from "../loader/loader";
import styles from "./authButton.module.css";

interface Props {
  label: string;
  handleClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const AuthButton = ({ label, handleClick, isDisabled, isLoading }: Props) => {
  return (
    <>
      <button
        className={
          isLoading
            ? `${styles.auth_btn} ${styles.loading}`
            : isDisabled
            ? `${styles.auth_btn} ${styles.disabled}`
            : styles.auth_btn
        }
        onClick={handleClick}
        disabled={isDisabled || isLoading}
      >
        {isLoading ? <Loader color="secondary" size="s" /> : label}
      </button>
    </>
  );
};

export default AuthButton;
