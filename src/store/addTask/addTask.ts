import { IPriority } from "@/modals/PriorityModal/PriorityModal";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IStates{
    addTaskModal: boolean,
    todo: ITodo,
    executorModal: boolean,
    priorityModal: boolean,
    calendarModal: boolean
}

interface Actions{
    setCompleteDate:(payload: string | ICompleteDate)=> void,
    setExecutor: (payload: string)=> void,
    setPriority: (payload: IPriority)=> void,
    setExecutorModal: ()=> void,
    setPriorityModal: ()=> void,
    setCalendarModal: ()=> void,
    setTaskName: (payload: string) => void,
    setDescription: (payload:string)=> void,
    resetAll: ()=> void,
    resetExecutor: ()=> void,
    resetDate: ()=> void,
    resetPriority: ()=> void,
    setAddTaskModal: (payload: boolean) => void
}

export interface ITodo{
    taskName: string,
    taskDescription: string,
    completeDate: ICompleteDate | string,
    executor: string,
    priority: string | IPriority
}

export interface ICompleteDate{
    numbered: string,
    inWords: string
}

export const todo = {
    taskName:'',
    taskDescription:'',
    completeDate: 'Срок выполнения',
    executor: 'Исполнитель',
    priority: 'Приоритет'


}

export const useTaskStore = create<IStates & Actions>()(devtools(immer((set)=>({
    addTaskModal: false,
    todo,
    executorModal: false,
    priorityModal: false,
    calendarModal: false,
    setCompleteDate: (payload)=> set((state)=> {state.todo.completeDate = payload}),
    setExecutor: (payload)=> set((state)=> {state.todo.executor = payload}),
    setPriority: (payload)=> set((state)=> {state.todo.priority = payload}),
    setExecutorModal: ()=> set((state)=>({executorModal: !state.executorModal})),
    setPriorityModal: ()=> set((state)=> ({priorityModal: !state.priorityModal})),
    setCalendarModal: ()=> set((state)=> ({calendarModal: !state.calendarModal})),
    setTaskName: (payload)=> set((state)=>  {state.todo.taskName = payload}),
    setDescription: (payload)=> set((state)=> {state.todo.taskDescription = payload}),
    resetAll: ()=> set((state)=>{
        state.todo.completeDate = 'Срок выполнения',
        state.todo.executor = 'Исполнитель',
        state.todo.priority = 'Приоритет',
        state.todo.taskName = '',
        state.todo.taskDescription = ''
    }),
    resetExecutor: ()=> set((state)=> {state.todo.executor = 'Исполнитель'}),
    resetDate: ()=> set((state)=> {state.todo.completeDate = 'Срок выполнения'}),
    resetPriority: ()=> set((state)=> {state.todo.priority = 'Приоритет'}),
    setAddTaskModal: (payload)=> set(()=> ({addTaskModal: payload}))

}))))