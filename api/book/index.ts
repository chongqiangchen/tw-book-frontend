import {request} from "@/lib/request";
import {useMutation, useQuery} from "@tanstack/react-query";
import {TBook, TCreateBookBody} from "@/api/book/types";
import {TSuccessResponse} from "@/api/types";

export const getAllBooksApi = async () => {
    return request.get<TBook[]>("/books").then((res) => res.data);
}

export const getBookByIdApi = async (id: number) => {
    return request.get<TBook>(`/books/${id}`).then((res) => res.data);
}

export const createBookApi = (body: TCreateBookBody) => {
    return request.post<TSuccessResponse>("/books", body);
}
export const deleteBookApi = async (id: number) => {
    return request.delete(`/books/${id}`);
}

export const updateBookApi = async (id: number, body: TCreateBookBody) => {
    return request.put(`/books/${id}`, body);
}

export const useGetAllBooks = () => {
    return useQuery<TBook[]>({
        queryKey: ["getAllBooks"],
        queryFn: getAllBooksApi,
    })
}

export const useGetBookById = (id: number) => {
    return useQuery<TBook>({
        queryKey: ["getBookById", id],
        queryFn: () => getBookByIdApi(id),
        enabled: !!id,
    })
}

export const useCreateBook = () => {
    return useMutation({
        mutationKey: ["createBook"],
        mutationFn: createBookApi,
    })
}

export const useDeleteBook = () => {
    return useMutation({
        mutationKey: ["deleteBook"],
        mutationFn: (id: number) => deleteBookApi(id),
    })
}

export const useUpdateBook = () => {
    return useMutation({
        mutationKey: ["updateBook"],
        mutationFn: ({id, body}: {id: number, body: TCreateBookBody}) => updateBookApi(id, body),
    })
}
