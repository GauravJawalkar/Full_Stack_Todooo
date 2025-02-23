"use client"
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Loader from './Loader';

function UpdateImageModal({ isUpdateImgVisible, onUpdateImgClose, id, reRender }: any) {

    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(id)
    async function handelUpdateImage() {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file)
            formData.append('id', id)
            const response = await axios.post('api/updateImage', formData)
            console.log("Response is : ", response.data.data);
            toast.success("Image Updated!");
            reRender();
            setLoading(false)
            onUpdateImgClose();
        } catch (error) {
            console.log("Error :", error)
        }
    }

    if (!isUpdateImgVisible) return null;
    return (
        <div>
            <section className="inset-0 fixed backdrop-blur-md bg-opacity-5 opacity-1 h-screen flex items-center justify-center z-10" >
                <div className="flex items-center justify-center">
                    <div className="w-[500px] max-md:w-fit max-sm:m-4 max-sm:p-5 border px-10 py-10 rounded-xl ">
                        <div className="flex items-center justify-end">
                            <button onClick={() => onUpdateImgClose()} className="bg-black rounded-md p-2 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x group-hover:rotate-90 transition-transform ease-linear duration-200"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handelUpdateImage() }} className="flex items-start gap-y-5 flex-col">
                            <div className="text-center w-full">
                                <h1 className="text-3xl font-bold my-3"> Update Your Todos!</h1>
                                <p className="text-base text-gray-400">List your tasks and get your day started planning it before hand.Max out your productivity</p>
                            </div>
                            <div className="w-full">
                                <label className="text-gray-300">Image :</label>
                                <input type="file" accept='image/*' title={"title"}
                                    onChange={(e: any) => { setFile(e.target.files[0]) }}
                                    className="w-full px-5 py-2 mt-2 bg-white rounded-sm text-black"
                                    name="" placeholder="Todo-Title" id="" />
                            </div>
                            <button type="submit" className={`bg-[#1a1a1a] w-full px-6 py-3 rounded text-white ring-1 ring-white uppercase hover:bg-black transition-all ease-linear duration-200`}>
                                {loading ? <Loader title='Uploading' /> : "Update Image"}
                            </button>
                        </form>
                    </div>
                </div>
            </section >
        </div>
    )
}

export default UpdateImageModal