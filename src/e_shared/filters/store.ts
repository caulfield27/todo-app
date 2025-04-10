import { create } from "zustand";

interface IFilter{
    value: string | number;
    label: string;
}

interface IDate{
    curDate: "from" | "to",
    fromValue: string,
    toValue: string
}

interface IStates{
    filter: IFilter,
    date: IDate
}

type Actions = {
    setFilter: (newFilter: IFilter)=> void,
    setDate: (cb: (prev: IDate)=> IDate)=> void,
    resetFilters: ()=> void
}

export const useFilters = create<IStates & Actions>((set)=> ({
    filter: {value: "", label: ""},
    date: {
        curDate: "from",
        fromValue: "",
        toValue: "",
    },
    setDate: (cb)=> set((state)=> ({date: cb(state.date)})),
    setFilter: (newFIlter)=> set(({filter: newFIlter})),
    resetFilters: ()=> set({
        filter: {value: "", label: ""},
        date: {
            curDate: "from",
            fromValue: "",
            toValue: ""
        }
    })
}))