import { getTodoes } from "@/utils/api";
import { getFromStorage } from "@/utils/useLocaleStorage";
import useSWR from "swr";

export function useTodoes(){
    const user = getFromStorage('user')
    const {data} = useSWR(`http://localhost:3000/api/todoes?id=${user[0].id}`, getTodoes)
    return data                                      
}