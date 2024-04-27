"use client";

import Image from "next/image"
import {
    Card,
} from "@/components/ui/card"
import {TBook} from "@/lib/requests/book/types";
import {useDeleteBook} from "@/lib/requests/book";
import {queryClient} from "@/app/providers";
import {toast} from "sonner";
import {Pencil, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {UpdateBookModal} from "@/app/(main)/books/components/update-book-modal";

type TProps = {
    book: TBook
}

export default function BookCard({book}: TProps) {
    const {mutate: deleteBook} = useDeleteBook()

    const handleDelete = () => {
        deleteBook(book.id, {
            onSuccess: () => {
                queryClient.refetchQueries({queryKey: ["getAllBooks"]}).then()
                toast.success("Book deleted successfully")
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden w-[240px]">
                <div className="grid gap-2">
                    <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.svg"
                        width="300"
                    />
                </div>
            </Card>
            <div className="flex justify-between items-start w-[240px]">
                <div className="space-y-1 text-sm px-1">
                    <h3 className="font-medium leading-5 text-base">{book.title}</h3>
                    <p className="text-xs text-muted-foreground">Author: {book.author}</p>
                    <p className="text-xs text-muted-foreground">Year: {book.publicationYear}</p>
                    <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                </div>
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="p-1 h-auto w-auto"
                        onClick={handleDelete}
                    >
                        <Trash className="w-4 h-4 text-red-600"/>
                    </Button>
                    <UpdateBookModal id={book.id} />
                </div>
            </div>
        </div>
    )
}
