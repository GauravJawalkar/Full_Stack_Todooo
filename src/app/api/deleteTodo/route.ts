import connectDB from "@/db/dbConfig";
import { Todo } from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

connectDB();


export async function DELETE(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const { _id } = reqBody;

        if (!_id) {
            return NextResponse.json(
                { error: "No Context to delete the task" },
                { status: 400 }
            )
        }

        const deleteTodo = await Todo.findByIdAndDelete(_id);

        if (!deleteTodo) {
            return NextResponse.json(
                { error: "Failed To delete the listed task!" },
                { status: 500 })
        }

        return NextResponse.json({ data: deleteTodo }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}