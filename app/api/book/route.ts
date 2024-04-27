import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/books");
        const books = await res.json();
        return NextResponse.json(books, {status: 200});
    } catch (error) {
        console.error("Failed to fetch book", {error});
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}

export async function POST(
    request: NextRequest,
) {
    try {
        const body = await request.json();
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const books = await res.json();
        return NextResponse.json(books, {status: 200});
    } catch (error) {
        console.error("Failed to fetch book", {error});
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}
