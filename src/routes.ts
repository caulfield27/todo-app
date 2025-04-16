export const apiUrl = {
  login: "/auth/local",
  signUp: "/auth/local/register",
  cronId: "/cron-tasks",
  updateUser: (userId: number)=>  `/users/${userId}`,
  getUser: (id: number)=> `/users/${id}?populate=*`,
  getUsers: `/users?populate=*`,
  getUserAvatar: (id: number) => `/users/${id}?populate[avatar]=*`,
  getFilteredTodoes: (filter: string, userId: number | string) => `/todoes?populate=*&filters[userId][id]=${userId}&${filter}`,
  getUserCron: (email: string)=> `/cron-tasks?filters[user]=${email}`,
  deleteCron: (docId: string)=> `/cron-tasks/${docId}`,
  getTodoes: (id: number | string)=> `/todoes?populate=*&filters[userId][id]=${id}`,
  postTodoes: '/todoes?populate=*',
  getTodayTodoes: (id: number | string, day: string) =>
    `/todoes?populate=*&filters[userId][id]=${id}&filters[deadline]=${day}&filters[isCompleted]=false`,
  getCompletedTodoes: (id:number | string, day: string)=> `/todoes?populate=*&filters[userId][id]=${id}&filters[isCompleted]=true`,
  getImportantTodoes: (id: number | string, dat: string)=> `/todoes?populate=*&filters[isCompleted]=false&filters[priority][$gt]=2`,
  getUpcomingTodoes: (id: number | string, today: string)=> `/todoes?populate=*&filters[userId][id]=${id}&filters[deadline][$gt]=${today}&filters[isCompleted]=false`,
  getSortedTodoes: (userId: number | string, day: string, key: string, type: "asc" | "desc") =>
    `/todoes?populate=*&filters[userId][id]=${userId}&filters[deadline]=${day}&filters[isCompleted]=false&sort[${key}]=${type}`,
  updateTodo: (docId: number | string) => `/todoes/${docId}`,
};
