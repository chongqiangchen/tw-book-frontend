import {NextRequest, NextResponse} from "next/server";


export async function PUT(
    request: NextRequest,
    {params}: {params: {id: string}}
) {
    const bookId = params.id;
    try {
        const body = await request.json();
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/books/" + bookId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const books = await res.json();
        return NextResponse.json(books, {status: 200});
    } catch (error) {
        console.error("Failed to fetch books", {error});
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}

export async function DELETE(
    request: NextRequest,
    {params}: {params: {id: string}}
) {
    const bookId = params.id;
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/books/" + bookId, {
            method: "DELETE",
        });
        const books = await res.json();
        return NextResponse.json(books, {status: 200});
    } catch (error) {
        console.error("Failed to fetch books", {error});
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}

export async function GET(
    request: NextRequest,
    {params}: {params: {id: string}}
) {
    const bookId = params.id;
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/books/" + bookId);
        const books = await res.json();
        return NextResponse.json(books, {status: 200});
    } catch (error) {
        console.error("Failed to fetch books", {error});
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}
