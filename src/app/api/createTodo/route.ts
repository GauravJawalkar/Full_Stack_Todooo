import connectDB from "@/db/dbConfig";
import { Todo } from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const deadline = formData.get('deadline') as Date | null;

    if (!title || !deadline) {
        console.log("This is true")
        return NextResponse.json({ data: "Title and deadline are required" }, { status: 401 })
    }

    const todo = await Todo.create(
        {
            title: title,
            description: description,
            completed: false,
            deadline: deadline
        }
    )

    if (!todo) {
        return NextResponse.json({ error: "Failed to create The todo" }, { status: 400 })
    }

    return NextResponse.json(
        {
            data: todo
        },
        {
            status: 200
        }
    )


}