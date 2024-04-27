
export type TBook = {
    id: number;
    title: string;
    author: string;
    publicationYear: string;
    isbn: string;
}

export type TCreateBookBody = {
    title: string;
    author: string;
    publicationYear: string;
    isbn: string;
}
