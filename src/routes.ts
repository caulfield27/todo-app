export const apiUrl = {
    login: "/auth/local",
    signUp: "/auth/local/register",
    todoes: "/todoes?populate=*",
    getTodoes: (id: number | string) => `/todoes?populate=*&filters[userId][id]=${id}`,
    updateTodo: (docId: number | string) => `/todoes/${docId}`
}