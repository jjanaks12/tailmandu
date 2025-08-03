export type APIError = {
    [propName: string]: string[]
}

export type APISuccessResponse<T> = {
    status: 'success'
    data: T | null
}

export type APIErrorResponse = {
    status: 'failed'
    message: string
    errors?: APIError
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse

export interface QueryParams {}

export type APISort = {
    order: 'asc' | 'desc'
    field: string
}

export type APIQuery = {
    per_page: number
    current: number
    s: string
    sort?: APISort
    filter: Record<string, string>
}