"use client"

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [completed, setCompleted] = useState("false");

  const handelSubmit = async (e: any) => {
    e?.preventDefault();
    // send form data here

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('completed', completed);
      formData.append('deadline', deadline)

      const response = await axios.post('/api/createTodo', formData);
      setTitle("");
      setDescription("");
      setDeadline("");
      setCompleted("");

      if (response) {
        console.log(response.data)
        toast.success('Todo Created')
      }
    } catch (error) {
      console.log("Error Sending todo : ", error);
    }

  }


  return (
    <section >
      <div className="flex items-center flex-col justify-center min-h-screen">
        <form onSubmit={handelSubmit} className="flex items-start flex-col gap-y-8 w-[500px] border p-10 rounded-xl bg-[#1a1a1a]">
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold my-3">List Your Tasks!</h1>
            <p className="text-base text-gray-400">List your tasks and get your day started planning it before hand.Max out your productivity</p>
          </div>
          <div className="w-full">
            <label className="text-gray-300">Title :</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-5 py-2 mt-2 rounded-sm text-black" name="" placeholder="Todo-Title" id="" />
          </div>
          <div className="w-full">
            <label className="text-gray-300">Description :</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-5 py-2 mt-2 rounded-sm text-black" name="" placeholder="Todo-Description" id="" />
          </div>
          <div className="w-full">
            <label className="text-gray-300">Deadline :</label>
            <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full px-5 mt-2 rounded-sm py-2 text-black" name="" placeholder="Set Deadline" id="" />
          </div>
          <div className="w-full flex items-center justify-start gap-x-5">
            <label
              htmlFor="AcceptConditions"
              className="relative inline-block h-7 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500">
              <input
                value={completed}
                onChange={(e) => setCompleted("true")}
                type="checkbox"
                id="AcceptConditions"
                className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
              />
              <span
                className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-5 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
              >
                <svg
                  data-unchecked-icon
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>

                <svg
                  data-checked-icon
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden size-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
            <label className="uppercase">In-Complete</label>
          </div>
          <button type="submit" className="bg-[#1a1a1a] w-full px-6 py-3 rounded text-white ring-1 ring-white uppercase hover:bg-black transition-all ease-linear duration-200">
            Create Todo
          </button>
        </form>
      </div>
    </section >
  );
}
