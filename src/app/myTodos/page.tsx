"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

function MyTodos() {

    const [data, setData] = useState([]);


    async function response() {
        const response: any = await axios.get('/api/getTodos')
        setData(response.data.data);
        return response;
    }

    const deleteMe = async (_id: string) => {
        await axios.delete('/api/deleteTodo', { data: { _id } });
        toast.error('Task Deleted')
        setData(values => {
            return values.filter((item: any) => item._id !== _id)
        })
    }

    const handelComplete = async (_id: any) => {
        await axios.post('/api/taskCompleted', { _id: { _id } })
        toast.success('Task Completed')
        response();
    }

    const completedTasks = async () => {
        const resp: any = await axios.get('/api/getCompletedTodos');

        if (resp.data.data.length === 0) {
            toast.error('No Task Completed ! Buckel up')
        } else if (resp.data.data.length !== 0) {
            toast.success('Completed Tasks ! Great Progress')
        }
        setData(resp.data.data)
    }

    // To render new tasks when reloaded
    useEffect(() => {
        response();
    }, [])

    return (
        <section>
            <div className="text-center text-4xl my-10 font-semibold">YOUR TASKS LIST</div>
            <div className="flex items-center justify-center gap-5">
                <Link href={'/'} className="bg-[#1a1a1a] px-4 py-2 rounded ring-1 ring-gray-700 hover:bg-black hover:ring-gray-500 transition-all ease-linear duration-200">Add A New Task</Link>
                <button onClick={() => { response(); }} className="bg-[#1a1a1a] px-4 py-2 rounded ring-1 ring-gray-700 hover:bg-black hover:ring-gray-500 transition-all ease-linear duration-200">All Tasks</button>
                <button onClick={() => {
                    completedTasks();
                }} className="bg-[#1a1a1a] px-4 py-2 rounded ring-1 ring-gray-700 hover:bg-black hover:ring-gray-500 transition-all ease-linear duration-200">Completed Tasks</button>
            </div>
            <div className={`grid grid-cols-4 ${data.length === 0 ? "grid-cols-none" : ""} max-sm:grid-cols-1 gap-10 p-10`}>
                {
                    data.length > 0 ? data.map(({ _id, title, deadline }) => {
                        return (
                            <div className='w-full bg-[#1a1a1a] border p-4 rounded-xl' key={_id}>
                                {/* color div*/}
                                <div className='h-1 bg-red-500 mb-4'>
                                </div>
                                <div className="mb-4">
                                    <h1 className='text-xl font-semibold line-clamp-4 '>{title}
                                    </h1>
                                </div>
                                <div className="flex items-center justify-start my-4 gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alarm"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M12 10l0 3l2 0" /><path d="M7 4l-2.75 2" /><path d="M17 4l2.75 2" /></svg>
                                    <h1 className="animate-pulse">
                                        : {new Date(deadline).toLocaleString('en-IN')}
                                    </h1>
                                </div>
                                <div className="my-3">

                                    {/* Complete Task Button */}
                                    <button onClick={() => {
                                        handelComplete(_id);
                                    }}
                                        className='bg-neutral-900 hover:text-green-500 hover:ring-green-500 transition-all ease-linear font-semibold duration-200 ring-1 ring-gray-400 px-4 py-2 rounded mr-5'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" /><path d="M9 12l2 2l4 -4" /></svg>
                                    </button>

                                    {/* Delete Task Button */}
                                    <button onClick={() => {
                                        deleteMe(_id);
                                    }} className='bg-neutral-900 hover:text-red-500 hover:ring-red-500 hover:font-semibold transition-all ease-linear duration-200 ring-1 ring-gray-400 px-4 py-2 rounded' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </button>
                                </div>
                            </div>
                        )
                    }) :
                        <div className="animate-pulse transition-all ease-linear duration-200  text-center">
                            NO TASKS REMAINING! GREAT
                        </div>
                }
            </div>

        </section>
    )
}

export default MyTodos