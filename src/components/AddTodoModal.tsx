"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";


export default function AddTodosModal({ isVisible, onClose, reRender }: any) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [file, setFile] = useState("");
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [loading, setLoading] = useState(false)

    const handelSubmit = async (e: any) => {
        e.preventDefault();
        // send form data here
        try {
            reRender();
            setLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', file);
            formData.append('description', description);
            formData.append('deadline', deadline);
            const response = await axios.post(`/api/createTodo`, formData);
            setTitle("");
            setDescription("");
            setDeadline("");
            setFile("");
            onClose();
            setLoading(false)
            reRender();
            if (response) {
                console.log(response.data)
                toast.success('Todo Created')
            }
        } catch (error) {
            console.log("Error Sending todo : ", error);
            toast.error("Error Sending the task try reloading the page");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (title.length < 3) {
            setDisabledBtn(true)
        } else {
            setDisabledBtn(false);
        }
    }, [title])



    if (!isVisible) return null;

    return (
        <>
            <section className="inset-0 fixed backdrop-blur-md bg-opacity-5 opacity-1 h-screen flex items-center justify-center z-10" >
                <div className="flex items-center justify-center">
                    <div className="w-[500px] max-md:w-fit max-sm:m-4 max-sm:p-5 border px-10 py-10 rounded-xl">
                        <div className="flex items-center justify-end">
                            <button onClick={() => onClose()} className="bg-black rounded-md p-2 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x group-hover:rotate-90 transition-transform ease-linear duration-200"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handelSubmit} className="flex items-start gap-y-5 flex-col">
                            <div className="text-center w-full">
                                <h1 className="text-3xl font-bold my-3"> Add Your Tasks!</h1>
                                <p className="text-base text-gray-400">List your tasks and get your day started planning it before hand.Max out your productivity</p>
                            </div>
                            <div className="w-full">
                                <label className="text-gray-300">Title :</label>
                                <input type="text" value={title} title={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-5 py-2 mt-2 rounded-sm text-black" name="" placeholder="Todo-Title" id="" />
                            </div>
                            <div className="w-full">
                                <label className="text-gray-300">Description :</label>
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-5 py-2 mt-2 rounded-sm text-black" name="" placeholder="Todo-Description" id="" />
                            </div>
                            <div className="w-full">
                                <label className="text-gray-300">Image :</label>
                                <input draggable type="file" onChange={(e: any) => setFile(e.target.files[0])} className="w-full px-5 py-2 mt-2 bg-white rounded-sm text-black" placeholder="Upload-Image" id="" />
                            </div>
                            <div className="w-full">
                                <label className="text-gray-300">Deadline :</label>
                                <input type="datetime-local" value={deadline} onChange={(e: any) => { setDeadline(e.target.value) }} className="w-full px-5 my-2 rounded-sm py-2 text-black" name="" placeholder="Set Deadline" id="" />
                            </div>
                            <button type="submit" disabled={disabledBtn} className={`bg-[#1a1a1a] w-full px-6 py-3 rounded text-white ring-1 ring-white uppercase hover:bg-black transition-all ease-linear duration-200 ${disabledBtn ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                {loading ? <Loader title="Processing" /> : "Create Todo"}
                            </button>
                        </form>
                    </div>
                </div>
            </section >
        </>
    );
}
