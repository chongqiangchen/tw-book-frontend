"use client";

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {useEffect, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useGetBookById, useUpdateBook} from "@/lib/requests/book";
import {toast} from "sonner";
import {queryClient} from "@/app/providers";
import {Pencil} from "lucide-react";

const formSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(20, 'Title must be less than 20 characters.'),
    author: z.string().min(1, 'Author is required.').max(20, 'Author must be less than 20 characters.'),
    publicationYear: z.string().length(4, 'Publication year must be a 4-digit number.').regex(/^\d{4}$/, 'Publication year must be numeric.'),
    isbn: z.string().min(1, 'ISBN is required.'),
});

export function UpdateBookModal({id}: { id: number }) {
    const [isOpen, setIsOpen] = useState(false)
    const {data, isLoading} = useGetBookById(id);
    const {mutate: updateBook} = useUpdateBook();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    console.log(data);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateBook({
            id,
            body: {
                title: values.title,
                author: values.author,
                publicationYear: values.publicationYear,
                isbn: values.isbn,
            }
        }, {
            onSuccess: () => {
                setIsOpen(false);
                queryClient.refetchQueries({queryKey: ["getAllBooks"]}).then()
                form.reset();
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    }

    useEffect(() => {
        if (data && !isLoading) {
            form.reset({
                title: data.title,
                author: data.author,
                publicationYear: data.publicationYear,
                isbn: data.isbn,
            })
        }
    }, [data, isLoading]);

    return (
        <Form {...form}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="p-1 h-auto w-auto"
                    >
                        <Pencil className="w-4 h-4"/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update A Book</DialogTitle>
                        <DialogDescription>
                            Update your own book.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Author
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="author"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="publicationYear"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Publication Year
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="publicationYear"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isbn"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        ISBN
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="isbn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                    </form>
                    <DialogFooter>
                        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Form>
    )
}
