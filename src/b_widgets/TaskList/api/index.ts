import { strapi } from "@/e_shared/api";
import { ITodoResponse } from "@/e_shared/types/types";
import { apiUrl } from "@/routes";
import { parseDay } from "@/utils/getDate";
import { getUserAttribute } from "@/utils/getUser";
import { Dispatch, SetStateAction } from "react";

const getTodoesByType = {
  today: (id: number | string, day: string) => apiUrl.getTodayTodoes(id, day),
  upcoming: (id: number | string, day: string) => apiUrl.getUpcomingTodoes(id, day),
  completed: (id: number | string, day: string) => apiUrl.getCompletedTodoes(id, day),
  important: (id: number | string, day: string) => apiUrl.getImportantTodoes(id, day),
  all: (id: number | string, day: string) => apiUrl.getTodoes(id),
};

function getTodoes(
    token : string, 
    type: "today" | "upcoming" | "completed" | "important" | "all", 
    setTodoes: Dispatch<SetStateAction<ITodoResponse[]>>, 
    setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  strapi
    .get(getTodoesByType[type](getUserAttribute("id"), parseDay(new Date().toDateString())), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setTodoes(res?.data?.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
}

export { getTodoes }
