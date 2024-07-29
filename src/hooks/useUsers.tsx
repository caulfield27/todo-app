import useSWR from "swr";
import { IUserData } from "@/utils/api";
import { getUsers } from "@/utils/api";

export function useUsers(){
    const { data } = useSWR<IUserData[]>('http://localhost:3000/api/users', getUsers)
    return data
}

