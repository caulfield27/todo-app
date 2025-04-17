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
    from: number | null,
    to: number | null,
    isRed: boolean,
    message: string,
    createdTime: string
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

export type {IUserData, ITodoResponse, CategoryType, IChat, IMessage}