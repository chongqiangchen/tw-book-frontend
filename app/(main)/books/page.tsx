"use client";

import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import BookCard from "@/app/(main)/books/components/book-card";
import {AddBookModal} from "@/app/(main)/books/components/add-book-modal";
import {useGetAllBooks} from "@/lib/requests/book";


export default function BookPage() {
    const {data, isLoading } = useGetAllBooks();
    const books = data || [];

    console.log(books)

    return (
        <div className="h-full px-4 py-6 lg:px-8">
            <div className="h-full space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Browse
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Find the book you like.
                        </p>
                    </div>
                    <AddBookModal />
                </div>
                <Separator className="my-4"/>
                <div className="relative">
                    <ScrollArea>
                        <div className="flex flex-wrap gap-4 pb-4">
                            {books.map((book) => (
                                <BookCard
                                    key={book.title}
                                    book={book}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
