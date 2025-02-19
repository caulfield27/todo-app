import PriorityIcon from "@/icons/priorityIcon/PriorityIcon";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import { ISortingOptions } from "@/e_shared/sorting/types";


const sortingOptions: ISortingOptions[] = [
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

const allSortingOptions: ISortingOptions[] = [
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
    },
    {
        label: "Дата выполнения",
        icon: <EventIcon style={{color: "#ff4b3e"}}/>,
        value: "executionDate"
    }
]

export {sortingOptions, allSortingOptions}
