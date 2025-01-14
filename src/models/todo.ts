import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false
        },
        deadline: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Todo = mongoose.model('Todos', todoSchema);