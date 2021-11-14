export interface Account {
    id: number
    title: string
    type: AccountType
    copy_lists: CopyItem[]
    data: any
}


export interface CopyItem {
    name: string,
    value: string
}


type AccountType = number


export enum AccountTypeEnum {
    Normal,
    Email,
    SSH,
}