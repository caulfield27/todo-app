import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaidIcon from "@mui/icons-material/Paid";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import SpaIcon from "@mui/icons-material/Spa";
import InterestsIcon from "@mui/icons-material/Interests";
import { ReactElement } from "react";
import Priority from "@/icons/priority/Priority";
import LowPriorityIcon from "@mui/icons-material/LowPriority";

interface IPriorityList{
    value: number;
    icon: ReactElement;
}

interface ICategoryList{
    label: {
        text: string;
        icon: ()=> ReactElement;
    };
    value: string;
}

export const priorityList: IPriorityList[] = [
  {
    value: 1,
    icon: <Priority value={"1"}/>,
  },
  {
    value: 2,
    icon: <Priority value={"2"}/>,
  },
  {
    value: 3,
    icon: <Priority value={"3"}/>,
  },
  {
    value: 4,
    icon: <Priority value={"4"}/>,
  },
];

export const categoryList: ICategoryList[] = [
  {
    label: { text: "Дом", icon: () => <HomeIcon  /> },
    value: "home",
  },
  {
    label: { text: "Работа", icon: () => <WorkIcon /> },
    value: "work",
  },
  {
    label: { text: "Спорт", icon: () => <SportsSoccerIcon /> },
    value: "sport",
  },
  {
    label: { text: "Учёба", icon: () => <LocalLibraryIcon /> },
    value: "study",
  },
  {
    label: { text: "Саморазвитие", icon: () => <SelfImprovementIcon /> },
    value: "self-development",
  },
  {
    label: { text: "Здоровье", icon: () => <FavoriteIcon /> },
    value: "health",
  },
  {
    label: { text: "Финансы", icon: () => <PaidIcon /> },
    value: "finance",
  },
  {
    label: { text: "Путишевствия", icon: () => <LocalAirportIcon /> },
    value: "trips",
  },
  {
    label: { text: "Отдых", icon: () => <SpaIcon /> },
    value: "rest",
  },
  {
    label: { text: "Другое", icon: () => <InterestsIcon /> },
    value: "others",
  },
];

export const priorityColors: {[key: string] : string} = {
  "1" : "#68FF6D",
  "2" : "#E6FF00",
  "3" : "#FFBB1A",
  "4" : "#FF0000"
}