import connectDB from "@/db/dbConfig";
import { Todo } from "@/models/todo";
import { uploadOnCloudinary } from "@/utils/uploadOnCloudinary";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const deadline = formData.get('deadline') as Date | null;
    const file = formData.get('file') as File | null

    console.log("File is ", file)

    if (!title || !deadline) {
        console.log("This is true")
        return NextResponse.json({ data: "Title and deadline are required" }, { status: 401 })
    }

    const response: any = await uploadOnCloudinary(file);

    if (!response) {
        console.log("Failed To upload image on Cloudinary")
    }

    const todo = await Todo.create(
        {
            title: title,
            description: description,
            image: response?.secure_url || "",
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