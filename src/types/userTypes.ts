export interface IUser {
    id: number
    email: string
    password: string
    picture: string
    nickname: string
    name?: string
    description: string
    teammate_description: string
}

export type IuserInsertData = Omit<IUser, 'id'>