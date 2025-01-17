"use client"
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { CiHome } from "react-icons/ci";
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
        try {
            const plan = await axios.post('/api/aiPlanner', userDetailsForPlan)
            const planResponse = await plan.data.data;
            const readyPlan = JSON.parse(planResponse);
            setData(readyPlan);
            return readyPlan
        } catch (error) {
            console.log("Error is : ", error)
        }
    }

    return (
        <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]  from-neutral-700 via-black to-neutral-900">
            <div className="flex backdrop-blur-xl inset-0 bg-opacity-5  items-center justify-center flex-col gap-5 ">
                <div className="flex items-center justify-center gap-2 mt-5 px-3 py-1 rounded" >
                    <CiHome /> <Link href={"/"} >Home</Link>  {">"} <IoBulbOutline /> <Link href={"/plan"} >Plan</Link>
                </div>
                <form onSubmit={handelPlan} className="space-y-4 w-[500px] border border-gray-700 px-10 py-8 rounded-md">
                    <h1 className="text-4xl font-semibold pb-10 animate-pulse text-center">Lets Plan For You!!</h1>
                    <div>
                        <div>
                            <label>Whats Your Name?</label>
                        </div>
                        <input className="text-black px-4 py-2 w-full" required placeholder="Name" value={name} onChange={(e: any) => { setName(e.target.value) }} type="text" />
                    </div>
                    <div>
                        <div>
                            <label>Whats Your Age?</label>
                        </div>
                        <input className="text-black px-4 py-2 w-full" required placeholder="Age" value={age} onChange={(e) => { setAge(e.target.value) }} type="text" />
                    </div>
                    <div>
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
                    </div>

                    {/* Optionla rendeirg SHIT */}
                    {working ? <div>
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
                        ""}

                    <div>
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
                    </div>
                    <div>
                        <div>
                            <label>Your Long Term Goal</label>
                        </div>
                        <input className="text-black px-4 py-2 w-full" required placeholder="Long term goal" value={lognTermGoal} onChange={(e) => { setLognTermGoal(e.target.value) }} type="text" />
                    </div>
                    <div>
                        <div>
                            <label>Your Short Term Goal</label>
                        </div>
                        <input className="text-black px-4 py-2 w-full" required placeholder="short term goal" value={shortTermGoal} onChange={(e) => { setShortTermGoal(e.target.value) }} type="text" />
                    </div>
                    <button type="submit" className="px-5 my-10 w-full py-2 bg-neutral-700 rounded uppercase font-semibold">Plan It</button>
                </form>
                {data?.length !== 0 ? <div className="w-[2px] bg-white animate-pulse h-20"></div> : ""}
            </div>
            {
                data.length === 0 ? "No data found" : data?.map(({ time, task, whatWillItHelpToAchieve }) => {
                    return <section className="flex items-center justify-center " key={Math.random()}>
                        <div className="w-[500px] flex items-center justify-center flex-col">
                            <div className=" border p-4 w-full rounded">
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

