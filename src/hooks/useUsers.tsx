import useSWR from "swr";
import { IUserData } from "@/c_feauters/signupForm";
import { getUsers } from "@/c_feauters/signupForm";

export function useUsers(){
    const { data } = useSWR<IUserData[]>('http://localhost:3000/api/users', getUsers)
    return data
}

