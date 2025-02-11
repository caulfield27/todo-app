import { SortValuesType } from "@/e_shared/sorting/data";
import { ITodoResponse } from "@/e_shared/types/types";

export function quickSort(todoes: ITodoResponse[], key: SortValuesType){
    if(todoes.length <= 1){
        return todoes;
    }
    console.log(todoes);
    
    const pivot = Math.floor(todoes.length / 2);
    const smaller = [];
    const bigger = [];
    

}