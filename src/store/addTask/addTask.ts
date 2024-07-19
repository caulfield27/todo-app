import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IStates{
    completeDate: string,
    executor: string,
    priority: string,
    reminder: string,
    executorModal: boolean,
}

interface Actions{
    setCompleteDate:(payload: string)=> void,
    setExecutor: (payload: string)=> void,
    setPriority: (payload: string)=> void,
    setReminder: (payload: string)=> void,
    setExecutorModal: ()=> void
}

export const useTaskStore = create<IStates & Actions>()(devtools((set)=>({
    completeDate: 'Срок выполнения',
    executor: 'Исполнитель',
    priority: 'Приоритет',
    reminder: 'Напоминание',
    executorModal: false,
    setCompleteDate: (payload)=> set({completeDate: payload}),
    setExecutor: (payload)=> set({executor: payload}),
    setPriority: (payload)=> set({priority: payload}),
    setReminder: (payload)=> set({reminder: payload}),
    setExecutorModal: ()=> set((state)=>({executorModal: !state.executorModal}))

})))