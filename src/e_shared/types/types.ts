interface IUserData{
    blocked?: boolean,
    confirmed?: boolean,
    createdAt?: string,
    documentId?: string,
    email: string,
    id?: number,
    provider?: string,
    publishedAt?: string,
    updatedAt?: string,
    username: string
}

interface ITodoResponse{
    id: number,
    documentId: string,
    subject: string,
    isExpired: boolean,
    isCompleted: boolean,
    deadline: null | string,
    priority: number,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    userName?: IUserData
}

export type {IUserData, ITodoResponse}