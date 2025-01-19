"use client"
import Loader from "@/components/Loader";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiHome } from "react-icons/ci";
import { FcNext, FcPrevious } from "react-icons/fc";
import { IoBulbOutline } from "react-icons/io5";

export default function PlanPage() {

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [working, setWorking] = useState(false);
    const [workTime, setWorkTime] = useState("");
    const [wakeUpTime, setWakeUpTime] = useState("");
    const [lognTermGoal, setLognTermGoal] = useState("");
    const [shortTermGoal, setShortTermGoal] = useState("");
    const [amPm, setAmPm] = useState("AM");
    const [workAmPm, setWorkAmPm] = useState("AM");
    const [loading, setLoading] = useState(false)
    const [nextStep, setNextStep] = useState(1);

    const userDetailsForPlan = {
        name,
        age,
        working: working || "",
        workTime,
        wakeUpTime,
        lognTermGoal,
        shortTermGoal,
        amPm,
        workAmPm
    }


    const handelPlan = async (e: any) => {
        e.preventDefault();
        setWorkAmPm("AM");
        try {
            setLoading(true)
            const plan = await axios.post('/api/aiPlanner', userDetailsForPlan)
            const planResponse = await plan.data.data;
            const readyPlan = JSON.parse(planResponse);
            setData(readyPlan);
            toast.success("Got You A Plan!")
            setName("");
            setAge("");
            setWorking(false);
            setWorkTime("");
            setWakeUpTime("");
            setLognTermGoal("");
            setShortTermGoal("");
            setLoading(false)
            return readyPlan
        } catch (error) {
            setLoading(false)
            console.log("Error is : ", error)
        }
    }


    return (
        <section className=" ">
            <div className="flex backdrop-blur-xl bg-opacity-5  items-center justify-center flex-col gap-5 h-screen">
                <div className="flex backdrop-blur-sm items-center justify-center gap-2 mt-5 px-3 py-1 rounded border border-gray-500" >
                    <CiHome /> <Link href={"/"} >Home</Link>  {">"} <IoBulbOutline /> <Link href={"/plan"} >Plan</Link>
                </div>
                <form onSubmit={handelPlan} className="space-y-4 w-[500px] border border-gray-700 px-10 py-8 rounded-md max-sm:w-auto max-sm:px-5">
                    <h1 className="text-4xl font-semibold pb-5 animate-pulse text-center">Lets Plan For You!!</h1>
                    {nextStep === 1 && <div>
                        <div className="mb-2">
                            <label>Whats Your Name ?</label>
                        </div>
                        <input className="text-black px-4 py-2 w-full rounded" required placeholder="Name" value={name} onChange={(e: any) => { setName(e.target.value) }} type="text" />
                    </div>}


                    {nextStep === 2 && <div>
                        <div>
                            <label>Whats Your Age?</label>
                        </div>
                        <input className="text-black px-4 py-2 w-full" required placeholder="Age" value={age} onChange={(e) => { setAge(e.target.value) }} type="text" />
                    </div>}



                    {/* {nextStep === 3 && <div>
                        <div>
                            <label>Are You Working?</label>
                        </div>

                        <div className="bg-white text-black flex items-center justify-start py-2 gap-5">
                            <span className="flex items-center justify-center gap-2 px-3">
                                <label >No</label>
                                <input checked={false} onChange={() => {
                                    setWorking(false)
                                }} type="radio" />
                            </span>
                            <span className="flex items-center justify-center gap-2 px-3">
                                <label> Yes</label>
                                <input placeholder="" checked={false} onChange={() => {
                                    setWorking(true)
                                }} type="radio" />
                            </span>
                        </div>
                    </div>}

                    
                    {working === true ? <div>
                        <div>
                            <label>Work Time</label>
                        </div>
                        <div>
                            <input className="text-black px-4 py-2 w-[80%]" placeholder="Work Time" value={workTime} onChange={(e) => { setWorkTime(e.target.value) }} type="time" />
                            <select className="px-4 py-[11px] text-black w-[20%] h-auto outline-none focus:outline-none" value={workAmPm} onChange={(e) => { setWorkAmPm(e.target.value) }}>
                                <option value={"AM"}>AM</option>
                                <option value={"PM"}>PM</option>
                            </select>
                        </div>
                    </div> :
                        ""} */}

                    {nextStep === 3 && <div>
                        <div>
                            <label>Wake Up Time</label>
                        </div>
                        <input className="text-black px-4 py-2 w-[80%]" required placeholder="Wake up time" value={wakeUpTime} onChange={(e: any) => {
                            setWakeUpTime(e.target.value);
                            console.log("Wake up time is :", wakeUpTime)
                        }} type="time" />
                        <select value={amPm} onChange={(e) => setAmPm(e.target.value)} className="text-black px-4 py-[11px] w-[20%] outline-none focus:outline-none">
                            <option value={"AM"}>AM</option>
                            <option value={"PM"}>PM</option>
                        </select>
                    </div>}
                    {nextStep === 4 && <div>
                        <div>
                            <label>Your Long Term Goal</label>
                        </div>
                        <input className="text-black px-4 py-2 w-full" required placeholder="Long term goal" value={lognTermGoal} onChange={(e) => { setLognTermGoal(e.target.value) }} type="text" />
                    </div>}
                    {nextStep === 5 && <div>
                        <div>
                            <label>Your Short Term Goal</label>
                        </div>
                        <input className="text-black px-4 py-2 w-full" required placeholder="short term goal" value={shortTermGoal} onChange={(e) => { setShortTermGoal(e.target.value) }} type="text" />
                    </div>}
                    <div className="flex items-center justify-start gap-5">
                        <button onClick={() => setNextStep(nextStep - 1)} className={`px-4 py-1 rounded bg-neutral-800 group ${nextStep === 1 ? "hidden" : "block"}`}>
                            <span className="flex items-center gap-2"><FcPrevious className="group-hover:-translate-x-1 transition-transform ease-in-out duration-200" />Prev </span>
                        </button>

                        <button onClick={() => setNextStep(nextStep + 1)} className={`px-4 py-1 rounded bg-neutral-800 group ${nextStep === 5 ? "hidden" : "block"}`}>
                            <span className="flex items-center gap-2">Next <FcNext className="group-hover:translate-x-1 transition-transform ease-in-out duration-200" />
                            </span>
                        </button>
                    </div>
                    {nextStep === 5 && <button type="submit" className="px-5 my-10 w-full py-2 bg-neutral-700 rounded uppercase font-semibold">{loading ? <Loader title="Creating your plan" /> : "Plan It"}</button>}
                </form>
                {data?.length !== 0 ? <div className="w-[2px] bg-white animate-pulse h-20"></div> : ""}
            </div>
            {
                data.length === 0 ? "" : data?.map(({ time, task, whatWillItHelpToAchieve }) => {
                    return <section className="flex items-center justify-center" key={Math.random()}>
                        <div className="w-[500px] max-sm:w-auto max-sm:px-5 flex items-center justify-center flex-col">
                            <div className="backdrop-blur-md border p-4 w-full rounded">
                                <h1 className="font-semibold text-lg uppercase py-2">Time 🕖 : {time} </h1>
                                <h1 className="font-semibold antialiased py-2 text-lg ">Task : <span>{task}</span></h1>
                                <h1 className="text-gray-400">{whatWillItHelpToAchieve}</h1>
                            </div>
                            <div className="w-[2px] bg-white animate-pulse h-20"></div>
                        </div>
                    </section>
                })
            }
        </section >
    );
}

