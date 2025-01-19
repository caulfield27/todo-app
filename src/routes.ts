export const apiUrl = {
    login: "/auth/local",
    signUp: "/auth/local/register",
    todoes: "/todoes?populate=*",
    getTodoes: (id: number | string) => `/todoes?populate=*&filters[userName][id]=${id}`
}