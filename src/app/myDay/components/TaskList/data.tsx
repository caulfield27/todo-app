import PriorityIcon from "@/icons/priorityIcon/PriorityIcon";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { ISortingOptions } from "@/e_shared/sorting/types";


export const sortingOptions: ISortingOptions[] = [
    {
        label: "Важность",
        icon: <PriorityIcon color="red"/>,
        value: "importance"
    },
    {
        label: "По алфавиту",
        icon: <SwapVertIcon/>,
        value: "alphabet"
    },
    {
        label: "Дата создания",
        icon: <EditCalendarIcon style={{color: "blue"}}/>,
        value: "createDate"
    }
]