import PriorityIcon from "@/icons/priorityIcon/PriorityIcon";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export interface ISortingOptions{
    label: string,
    icon: React.ReactElement,
    value: string
}

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
    },
    {
        label: "Дата выполнения",
        icon: <EventIcon style={{color: "gray"}}/>,
        value: "executionDate"
    },
    {
        label: "Сбросить",
        icon: <RestartAltIcon/>,
        value: "reset"
    }
]

export type SortValuesType = (typeof sortingOptions)[number]['value']