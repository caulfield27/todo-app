import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import styles from "./Calendar.module.css";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface Props {
  handleChange: (newValue: Dayjs) => void;
  value: Dayjs;
  setIsOpen: Dispatch<SetStateAction<{
    isOpen: boolean,
    isSelected: boolean
  }>>;
  classes?: string
}

export default function Calendar({ handleChange, value, setIsOpen, classes}: Props) {
  const shouldDisabledDate = (day: Dayjs) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const validDays = day.toDate();
    return validDays < today;
  };
  const calendarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsOpen(prev => ({isOpen: false, isSelected: prev.isSelected}));
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        ref={calendarRef}
        shouldDisableDate={shouldDisabledDate}
        value={value}
        onChange={handleChange}
        className={classes ?? ""}
      />
    </LocalizationProvider>
  );
}
