import SwapVertIcon from "@mui/icons-material/SwapVert";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import { ISortingOptions } from "@/e_shared/sorting/types";
import LowPriorityIcon from "@mui/icons-material/LowPriority";


const sortingOptions: ISortingOptions[] = [
    {
        label: "Важность",
        icon: <LowPriorityIcon/>,
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

const allSortingOptions: ISortingOptions[] = [
    {
        label: "Важность",
        icon: <LowPriorityIcon/>,
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
    },
    {
        label: "Дата выполнения",
        icon: <EventIcon style={{color: "#ff4b3e"}}/>,
        value: "executionDate"
    }
]

export {sortingOptions, allSortingOptions}
