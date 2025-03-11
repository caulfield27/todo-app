import { create } from "zustand";

interface IStates {
  refs: Set<HTMLElement>
}

type Actions = {
  setRefs: (ref: HTMLElement)=> void
};

export const useAddTaskForm = create<IStates & Actions>((set) => ({
  refs: new Set(),
  setRefs(ref){
    set((state)=> ({refs: new Set(state.refs).add(ref)}))
  }
}));
