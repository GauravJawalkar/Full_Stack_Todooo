import connectDB from "@/db/dbConfig";
import { Todo } from "@/models/todo";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


connectDB();


export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const completed = formData.get('completed') as boolean | null;
        const deadline = formData.get('deadline') as Date | null;


        if (!title || !deadline) {
            return NextResponse.json({ data: "Title and deadline are required" }, { status: 401 })
        }

        const todo = await Todo.create(
            {
                title: title,
                description: description,
                completed: completed,
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

    } catch (error) {
        throw NextResponse.json({ errorCreateTodo: error }, { status: 400 })
    }
}