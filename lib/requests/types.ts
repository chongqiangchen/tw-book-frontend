

export type TResponse<T> = {
    data: T;
    code: number;
    msg: string;
}

export type TSuccessResponse = {
    code: number;
    msg: string;
}
