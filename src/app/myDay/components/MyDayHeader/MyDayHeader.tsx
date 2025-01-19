import { parseDateToReadable } from "@/utils/getDate";
import styles from './MyDayHeader.module.css';

const MyDayHeader = () => {
    const currentDay = new Date();
    return (
        <header className={styles.header_grid}>
            <span className={styles.my_day_span}>Мой день</span>
            <span className={styles.date_span}>{parseDateToReadable(currentDay.toString(), false)}</span>
            <span className={styles.sorting_container}>сортировка</span>
        </header>
    );
}
 
export default MyDayHeader;