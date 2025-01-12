import connectDB from "@/db/dbConfig";
import { Todo } from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const { _id } = reqBody;

        if (!_id) {
            throw NextResponse.json({ error: "No Context found to update the todo task as complete.Didnt got any _id" }, { status: 400 })
        }

        const completedTodoTask = await Todo.findByIdAndUpdate(_id,
            {
                $set: {
                    completed: true
                }
            },
            {
                new: true
            }
        )

        if (!completedTodoTask) {
            return NextResponse.json(
                { error: "Failed to update the todo task as completed" },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { data: completedTodoTask },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}