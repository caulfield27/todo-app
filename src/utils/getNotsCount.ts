import { INotifications } from "@/e_shared/types/types";

export const getNotesCounts = (nots: INotifications[])=>{
    let counter = 0;
    for(const not of nots){
        if(!not.isRead){
            counter++;
        }
    }

    return counter;
}