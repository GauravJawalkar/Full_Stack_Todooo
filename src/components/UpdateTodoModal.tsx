"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateTodosModal({ isUpdateVisible, onUpdateClose, title, id, reRender }: any) {

    const [updatedTitle, setUpdatedTitle] = useState("");
    const [idd, setIdd] = useState("")

    const handelUpdate = async (title: string, _id: string) => {
        const response = await axios.put('/api/updateTodo', { title, _id })
        toast.success("Task Updated!");
        reRender();
        onUpdateClose();
        console.log("updated todo is ", response.data.data)
    }

    useEffect(() => {
        setUpdatedTitle(title)
        setIdd(id);
    }, [title, id])

    if (!isUpdateVisible) return null;

    return (
        <>
            <section className="inset-0 fixed backdrop-blur-md bg-opacity-5 opacity-1 h-screen flex items-center justify-center z-10" >
                <div className="flex items-center justify-center">
                    <div className="w-[500px] border px-10 py-10 rounded-xl ">
                        <div className="flex items-center justify-end">
                            <button onClick={() => onUpdateClose()} className="bg-black rounded-md p-2 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x group-hover:rotate-90 transition-transform ease-linear duration-200"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handelUpdate(updatedTitle, idd) }} className="flex items-start gap-y-5 flex-col">
                            <div className="text-center w-full">
                                <h1 className="text-3xl font-bold my-3"> Update Your Todos!</h1>
                                <p className="text-base text-gray-400">List your tasks and get your day started planning it before hand.Max out your productivity</p>
                            </div>
                            <div className="w-full">
                                <label className="text-gray-300">Title :</label>
                                <input type="text" value={updatedTitle} title={"title"}
                                    onChange={(e) => { setUpdatedTitle(e.target.value) }} className="w-full px-5 py-2 mt-2 rounded-sm text-black"
                                    name="" placeholder="Todo-Title" id="" />
                            </div>
                            {/* <div className="w-full">
                                <label className="text-gray-300">Deadline :</label>
                                <input type="datetime-local" value={""} onChange={() => { }} className="w-full px-5 my-2 rounded-sm py-2 text-black" name="" placeholder="Set Deadline" id="" />
                            </div> */}
                            <button type="submit" className={`bg-[#1a1a1a] w-full px-6 py-3 rounded text-white ring-1 ring-white uppercase hover:bg-black transition-all ease-linear duration-200`}>
                                Save Updates
                            </button>
                        </form>
                    </div>
                </div>
            </section >
        </>
    );
}
