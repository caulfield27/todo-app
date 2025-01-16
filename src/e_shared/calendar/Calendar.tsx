import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface Props{
    handleChange: (newValue: Dayjs)=> void;
    value: Dayjs
}

export default function Calendar({handleChange, value} : Props) {

  const shouldDisabledDate = (day: Dayjs)=>{
    const today = new Date();
    today.setHours(0,0,0,0);
    const validDays = day.toDate();
    return validDays < today;
  } 
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar shouldDisableDate={shouldDisabledDate} value={value} onChange={handleChange} />
    </LocalizationProvider>
  );
}