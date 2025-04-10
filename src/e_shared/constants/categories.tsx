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
import { CategoryType } from "../types/types";

export interface ICategoryList {
  label: {
    text: string;
    icon: () => ReactElement;
  };
  value: CategoryType
}

export const categoryList: ICategoryList[] = [
  {
    label: { text: "Дом", icon: () => <HomeIcon /> },
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

export const categoryIcons: {[key: string] : [ReactElement, string]} = {
  "home": [<HomeIcon style={{color: "var(--defaultColor)", width: "18px"}}/>,'Дом'],
  "work": [<WorkIcon style={{color: "var(--defaultColor)", width: "18px"}}/>,'Работа'],
  "sport": [<SportsSoccerIcon style={{color: "var(--defaultColor)", width: "18px"}}/>,'Спорт'],
  "study": [<LocalLibraryIcon style={{color: "var(--defaultColor)", width: "18px"}}/>,'Учёба'],
  "self-development": [<SelfImprovementIcon style={{color: "var(--defaultColor)", width: "18px"}}/>,'Саморазвитие'],
  "health" : [<FavoriteIcon style={{color: "var(--defaultColor)", width: "18px"}}/>, 'Здоровье'],
  "finance" : [<PaidIcon style={{color: "var(--defaultColor)", width: "18px"}}/>,'Финансы'],
  "trips" : [<LocalAirportIcon style={{color: "var(--defaultColor)", width: "18px"}}/>,'Путешевствия'],
  "rest" : [<SpaIcon style={{color: "var(--defaultColor)", width: "18px"}}/>,'Отдых'], 
  "others" : [<InterestsIcon style={{color: "var(--defaultColor)", width: "18px"}}/>,'Другое']
}
