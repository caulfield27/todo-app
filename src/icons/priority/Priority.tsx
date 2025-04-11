import { priorityColors } from "@/e_shared/constants/priority";
import FlagIcon from "@mui/icons-material/Flag";
import styles from "./Priority.module.css";

const Priority = ({ value, isTable }: { value: number | string; isTable?: boolean }) => {
  return (
    <div style={{ pointerEvents: "none" }} className={styles.priority_wrapper}>
      <FlagIcon style={{ color: priorityColors[value] }} />
      {!isTable && <span>{`Приоритет ${value}`}</span>}
    </div>
  );
};

export default Priority;
