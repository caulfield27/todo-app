import { create } from "zustand";

interface IStates {
  refs: HTMLElement[];
}

type Actions = {
  setRefs: (ref: HTMLElement)=> void,
  isContain: (target: Node)=> boolean
};

export const useAddTaskForm = create<IStates & Actions>((set) => ({
  refs: [],
  setRefs(ref){
    set((state)=> ({refs: [...state.refs, ref]}))
  },
  isContain(target){
    return this.refs.every((ref)=> !ref.contains(target));
  }
}));
