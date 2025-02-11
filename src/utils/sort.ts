import { SortValuesType } from "@/e_shared/sorting/data";
import { ITodoResponse } from "@/e_shared/types/types";

export function quickSort(todoes: ITodoResponse[], key: SortValuesType){
    if(todoes.length <= 1){
        return todoes;
    }
    
}