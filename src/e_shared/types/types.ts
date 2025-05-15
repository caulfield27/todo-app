interface IUserData{
    blocked?: boolean,
    confirmed?: boolean,
    createdAt?: string,
    documentId: string,
    email: string,
    id: number,
    provider?: string,
    publishedAt?: string,
    updatedAt?: string,
    username: string,
    avatar: IImg | null
}

interface IChat{
    userId: number,
    messages: IMessage[],
    username: string,
    avatar: string | null   
}

interface IMessage{
    id?: number,
    from: number | null,
    to: number | null,
    message: string,
    createdTime?: Date
}

interface IDetailedMessage{
    id?: number,
    from: {
        username: string,
        avatar: string | null,
        id: number | null
    },
    to: number | null,
    message: string,
    createdTime?: Date
}

interface IImg{
    id: number,
    mime: string,
    height: number,
    width: number,
    size: number,
    url: string
}

interface ITodoResponse{
    id: number,
    documentId: string,
    subject: string,
    isExpired: boolean,
    isCompleted: boolean,
    deadline: null | string,
    priority: number,
    category: CategoryType
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    userId?: IUserData
}

interface INotifications{
    id: number,
    documentId: string,
    isRead: boolean,
    type: "message" | "task",
    subject: string,
    createdAt: string,
    updatedAt: string,
}

type CategoryType = 
| "work"
| "home"
| "sport"
| "study"
| "self-development"
| "health"
| "finance"
| "trips"
| "rest"
| "others";

export type {IUserData, ITodoResponse, CategoryType, IChat, IMessage, IDetailedMessage, INotifications}