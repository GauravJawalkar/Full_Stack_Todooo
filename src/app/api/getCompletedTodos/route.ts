import connectDB from "@/db/dbConfig";
import { Todo } from "@/models/todo";
import { NextResponse } from "next/server";


connectDB();
export async function GET() {
    try {

        const completedTasks = await Todo.find(
            {
                completed: true
            }
        )

        if (!completedTasks) {
            throw NextResponse.json(
                {
                    error: "No completed Tasks found"
                },
                {
                    status: 400
                }
            )
        }

        return NextResponse.json(
            {
                data: completedTasks
            },
            {
                status: 200
            }
        )

    } catch (error) {
        throw NextResponse.json(
            {
                error: error
            },
            {
                status: 500
            }
        )
    }
}