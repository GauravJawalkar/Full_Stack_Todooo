"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [completed, setCompleted] = useState("false");
  const router = useRouter();

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
      router.push('/myTodos')

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
            <h1 className="text-3xl font-bold my-3">Add Your Tasks!</h1>
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
            <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full px-5 my-2 rounded-sm py-2 text-black" name="" placeholder="Set Deadline" id="" />
          </div>
          <button type="submit" className="bg-[#1a1a1a] w-full px-6 py-3 rounded text-white ring-1 ring-white uppercase hover:bg-black transition-all ease-linear duration-200">
            Create Todo
          </button>
        </form>
      </div>
    </section >
  );
}
