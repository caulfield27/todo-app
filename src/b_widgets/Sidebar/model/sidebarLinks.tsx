import StarsIcon from "@mui/icons-material/Stars";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ChecklistIcon from '@mui/icons-material/Checklist';
import ChatIcon from '@mui/icons-material/Chat';

export const sidebarLinks = [
    {
        id: 1,
        label: 'Мой день',
        path: '/myDay',
        icon: <TodayIcon/>,
    },
    {
        id: 2,
        label: 'Предстоящие',
        path: '/upcoming',
        icon: <CalendarMonthIcon/>
    },
    {
        id: 3,
        label: 'Важные',
        path: '/important',
        icon: <StarsIcon/>
    },
    {
        id: 4,
        label: 'Выполненные',
        path: '/completed',
        icon: <AddTaskIcon/>
    },
    {
        id: 5,
        label: 'Все задачи',
        path: '/tasks',
        icon: <ChecklistIcon/>
    },
    {
        id:6,
        label: 'Сообщество',
        path: "/community",
        icon: <ChatIcon/>
    }

]