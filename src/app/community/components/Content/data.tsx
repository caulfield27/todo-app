import { ReactElement } from "react"
import { Chat } from "../Chat/Chat"
import { Posts } from "../Posts/Posts"
import { Users } from "../Users/Users"

interface ITabList{
    label: string,
    value: string
}

export const tabList: ITabList[] = [
    {
        label: "Пользователи",
        value: "users"
    },
    {
        label: "Чат",
        value: "chat",
    },
    {
        label: "Посты",
        value: "posts"
    }
]

export const tabContent: {[key: string] : ReactElement} = {
    users: <Users/>,
    chat: <Chat/>,
    posts: <Posts/>
}