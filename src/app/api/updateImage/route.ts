import connectDB from "@/db/dbConfig";
import { Todo } from "@/models/todo";
import { uploadOnCloudinary } from "@/utils/uploadOnCloudinary";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(request: NextRequest) {


    // const reqBody = request.json();
    const formData = await request.formData();

    const file = formData.get('file');
    const id = formData.get('id');




    const response: any = await uploadOnCloudinary(file);
    console.log("uploaded on cloudinary", response)

    if (!response) {
        return NextResponse.json({ error: "Failed to upload the image on cloudinary" }, { status: 400 })
    }

    const upddateImage = await Todo.findByIdAndUpdate(id,
        {
            $set: {
                image: response?.secure_url || ""
            }
        },
        {
            new: true
        }
    )

    console.log("updateiMg api res:", upddateImage)

    return NextResponse.json({ data: upddateImage }, { status: 200 })




}