
export const apiUrl = {
  login: "/auth/local",
  signUp: "/auth/local/register",
  todoes: "/todoes?populate=*",
  getTodayTodoes: (id: number | string, day: string) =>
    `/todoes?populate=*&filters[userId][id]=${id}&filters[deadline]=${day}&filters[isCompleted]=false`,
  getSortedTodoes: (userId: number | string, day: string, key: string, type: "asc" | "desc") =>
    `/todoes?populate=*&filters[userId][id]=${userId}&filters[deadline]=${day}&filters[isCompleted]=false&sort[${key}]=${type}`,
  updateTodo: (docId: number | string) => `/todoes/${docId}`,
};
