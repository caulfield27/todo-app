import PriorityIcon from "@/icons/priorityIcon/PriorityIcon";
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from "@/icons/categoryIcon/CategoryIcon";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const filterList = [
    {
        value: "default",
        label: "Фильтры",
        icon: <FilterAltIcon/>
    },
    {
        value: "",
        label: "Приоритет",
        icon: <PriorityIcon/>
    },
    {
        value: "",
        label: "Категория",
        icon: <CategoryIcon/>
    },
    {
        value: "",
        label: "Срок от",
        icon: <EventIcon/>
    },
    {
        value: "",
        label: "Срок до",
        icon: <EventIcon/>
    },
]