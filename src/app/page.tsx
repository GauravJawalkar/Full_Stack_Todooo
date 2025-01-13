"use client"

import AddTodosModal from "@/components/AddTodoModal";
import UpdateTodosModal from "@/components/UpdateTodoModal";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";


export const dynamic = 'auto';

function Home() {

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');


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
      toast.success(`${resp.data.data.length} Tasks Completed ! Great Progress`)
    }
    setData(resp.data.data)
  }

  // To render new tasks when reloaded
  useEffect(() => {
    response();
  }, [])

  return (
    <section className="mx-auto container">
      <div className="text-center text-4xl my-10 font-semibold ">TASKLii-📝</div>
      <div>
        <div className="flex items-center justify-center gap-5 my-5 flex-wrap px-[6px]">
          <button onClick={() => {
            setModal(true)
          }}
            className="bg-[#1a1a1a] px-4 py-2 rounded ring-1 ring-gray-700 hover:bg-black hover:ring-gray-500 transition-all ease-linear duration-200">Add A New Task</button>
          <button onClick={() => { modal ? setModal(false) : ""; response() }} className="bg-[#1a1a1a] px-4 py-2 rounded ring-1 ring-gray-700 hover:bg-black hover:ring-gray-500 transition-all ease-linear duration-200">Ongoing Tasks</button>
          <button onClick={() => {
            completedTasks();
            setModal(false)
          }} className="bg-[#1a1a1a] px-4 py-2 rounded ring-1 ring-gray-700 hover:bg-black hover:ring-gray-500 transition-all ease-linear duration-200">Completed Tasks</button>
        </div>
        <AddTodosModal isVisible={modal} onClose={() => { setModal(false) }} reRender={() => response()} />
        <UpdateTodosModal isUpdateVisible={updateModal} onUpdateClose={() => { setUpdateModal(false) }} title={title} id={id} reRender={() => response()} />
      </div>
      {/* TASKS LIST */}
      <div className={`grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2  ${data.length === 0 ? "xl:grid-cols-none md:grid-cols-none lg:grid-cols-none grid-cols-none" : "grid-cols-1"} max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-1 gap-10 p-10`}>
        {
          data.length > 0 ? data.map(({ _id, title, deadline }) => {
            return (
              <div className='w-full bg-[#1a1a1a] border border-gray-700 p-4 rounded-xl' key={_id}>
                {/* color div*/}
                <div className='h-1 bg-red-500 mb-4'>
                </div>
                <div className="mb-4">
                  <h1 className='text-xl font-semibold line-clamp-3'>{title}
                  </h1>
                </div>
                <div className="flex items-center justify-start my-4 gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alarm"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M12 10l0 3l2 0" /><path d="M7 4l-2.75 2" /><path d="M17 4l2.75 2" /></svg>
                  <h1 className="animate-pulse">
                    : {new Date(deadline).toLocaleString('en-IN')}
                  </h1>
                </div>
                <div className="my-3 ">
                  {/* Complete Task Button */}
                  <button onClick={(e) => {
                    e.preventDefault();
                    handelComplete(_id);
                  }}
                    className='bg-neutral-900 hover:text-green-500 hover:ring-green-500 transition-all ease-linear font-semibold duration-200 ring-1 ring-gray-400 px-4 py-2 rounded mr-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" /><path d="M9 12l2 2l4 -4" /></svg>
                  </button>
                  {/* Update Task Button */}
                  <button onClick={(e) => {
                    e.preventDefault();
                    setTitle(title);
                    setId(_id);
                    setUpdateModal(true)
                  }} className='bg-neutral-900 hover:text-blue-500 hover:ring-blue-500 hover:font-semibold transition-all ease-linear duration-200 ring-1 ring-gray-400 px-4 py-2 rounded mr-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M10.507 10.498l-1.507 1.502v3h3l1.493 -1.498m2 -2.01l4.89 -4.907a2.1 2.1 0 0 0 -2.97 -2.97l-4.913 4.896" /><path d="M16 5l3 3" /><path d="M3 3l18 18" /></svg>
                  </button>

                  {/* Delete Task Button */}
                  <button onClick={(e) => {
                    e.preventDefault();
                    deleteMe(_id);
                  }} className='bg-neutral-900 hover:text-red-500 hover:ring-red-500 hover:font-semibold transition-all ease-linear duration-200 ring-1 ring-gray-400 px-4 py-2 rounded' >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                  </button>
                </div>
              </div>
            )
          }) :
            <div className={` ${modal === true ? "hidden" : "flex items-center justify-center flex-col"} text-center`}>
              <span className="animate-pulse transition-all ease-linear duration-200"> NO TASKS REMAINING! GREAT</span>
              <Image src={'/noTaskRemaining.svg'} className="w-fit h-72" width={200} height={200} alt="no task image" />
            </div>
        }
      </div>
    </section>
  )
}

export default Home