export const apiUrl = {
    login: "/auth/local",
    signUp: "/auth/local/register",
    todoes: "/todoes?populate=*",
    getTodayTodoes: (id: number | string, day: string) => `/todoes?populate=*&filters[userId][id]=${id}&filters[deadline]=${day}&filters[isCompleted]=false`,
    updateTodo: (docId: number | string) => `/todoes/${docId}`
}