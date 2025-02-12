import { SortValuesType } from "@/e_shared/sorting/types";
import { ITodoResponse } from "@/e_shared/types/types";

export function quickSort(
  todoes: ITodoResponse[],
  key: SortValuesType,
  order: "asc" | "desc"
): ITodoResponse[] {
  if (todoes.length <= 1) {
    return todoes;
  }
  const pivot = Math.floor(todoes.length / 2);
  const smaller = [];
  const bigger = [];
  for (let i = 0; i < todoes.length; i++) {
    if (i === pivot) continue;
    switch (key) {
      case "createDate":
      case "executionDate":
        const curValue = key === "createDate" ? todoes[i].createdAt : todoes[i].deadline;
        const pivotValue = key === "createDate" ? todoes[pivot].createdAt : todoes[pivot].deadline;
        const valueTime = new Date(typeof curValue === "string" ? curValue : 0).getTime();
        const pivotTime = new Date(typeof pivotValue === "string" ? pivotValue : 0).getTime();
        if (valueTime > pivotTime) {
          bigger.push(todoes[i]);
        } else {
          smaller.push(todoes[i]);
        }
        break;
      case "alphabet":
        if (todoes[i].subject.localeCompare(todoes[pivot].subject) > 0) {
          bigger.push(todoes[i]);
        } else {
          smaller.push(todoes[i]);
        }
        break;
      case "importance":
        if (todoes[i].priority > todoes[pivot].priority) {
          bigger.push(todoes[i]);
        } else {
          smaller.push(todoes[i]);
        }
    }
  }

  return order === "asc"
    ? [...quickSort(smaller, key, order), todoes[pivot], ...quickSort(bigger, key, order)]
    : [...quickSort(bigger, key, order), todoes[pivot], ...quickSort(smaller, key, order)];
}
