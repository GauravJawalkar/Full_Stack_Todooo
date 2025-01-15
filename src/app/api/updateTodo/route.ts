import connectDB from "@/db/dbConfig";
import { Todo } from "@/models/todo";
import { uploadOnCloudinary } from "@/utils/uploadOnCloudinary";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(request: NextRequest) {

    try {


        const reqBody = await request.json();

        const { _id, title } = reqBody;


        if (!_id && !title) {
            return NextResponse.json({ error: "_id and title not found in the request body" })
        }



        const update = await Todo.findByIdAndUpdate(_id,
            {
                $set: {
                    title: title
                }
            },
            {
                new: true
            }
        )

        if (!update) {
            return NextResponse.json({ error: "Failed to update the todo task" }, { status: 400 })
        }

        return NextResponse.json({ data: update }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }

}