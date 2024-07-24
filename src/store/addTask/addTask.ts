import { IPriority } from "@/modals/PriorityModal/PriorityModal";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IStates{
    completeDate: string,
    executor: string,
    priority: string | IPriority,
    executorModal: boolean,
    priorityModal: boolean,
    calendarModal: boolean
}

interface Actions{
    setCompleteDate:(payload: string)=> void,
    setExecutor: (payload: string)=> void,
    setPriority: (payload: IPriority)=> void,
    setExecutorModal: ()=> void,
    setPriorityModal: ()=> void,
    setCalendarModal: ()=> void
}

export const tasks = {
    taskName:'',
    taskDescription:'',
    completeDate: 'Срок выполнения',
    executor: 'Исполнитель',
    priority: 'Приоритет'

}

export const useTaskStore = create<IStates & Actions>()(devtools((set)=>({
    completeDate: 'Срок выполнения',
    executor: 'Исполнитель',
    priority: 'Приоритет',
    executorModal: false,
    priorityModal: false,
    calendarModal: false,
    setCompleteDate: (payload)=> set({completeDate: payload}),
    setExecutor: (payload)=> set({executor: payload}),
    setPriority: (payload)=> set({priority: payload}),
    setExecutorModal: ()=> set((state)=>({executorModal: !state.executorModal})),
    setPriorityModal: ()=> set((state)=> ({priorityModal: !state.priorityModal})),
    setCalendarModal: ()=> set((state)=> ({calendarModal: !state.calendarModal})),


})))