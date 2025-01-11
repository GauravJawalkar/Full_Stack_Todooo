import connectDB from "@/db/dbConfig";
import { Todo } from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {

        const allTodos = await Todo.find({
            completed: false
        });

        if (!allTodos) {
            return NextResponse.json({ data: "No Todos Found" }, { status: 400 })
        }

        return NextResponse.json({ data: allTodos }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}