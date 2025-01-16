"use client"
import axios from "axios";
import React, { useState } from "react";

export default function PlanPage() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [working, setWorking] = useState(false);
    const [workTime, setWorkTime] = useState("");
    const [wakeUpTime, setWakeUpTime] = useState("");
    const [lognTermGoal, setLognTermGoal] = useState("");
    const [shortTermGoal, setShortTermGoal] = useState("");


    const userDetailsForPlan = {
        name,
        age,
        working: working || "",
        workTime,
        wakeUpTime,
        lognTermGoal,
        shortTermGoal
    }



    const handelPlan = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post('/api/aiPlanner', userDetailsForPlan)
        } catch (error) {
            console.log("Error is : ", error)
        }
    }

    return (
        <section className="min-h-screen content-center text-center">
            <div>
                <div>
                    <h1 className="text-4xl font-semibold pb-10">Tell Me About Yourself</h1>
                </div>
                <form onSubmit={handelPlan}>
                    <div>
                        <label>Whats Your Name?</label>
                        <input className="text-black px-4 py-1" required placeholder="Name" value={name} onChange={(e: any) => { setName(e.target.value) }} type="text" />
                    </div>
                    <div>
                        <label>Whats Your Age?</label>
                        <input className="text-black px-4 py-1" required placeholder="Age" value={age} onChange={(e) => { setAge(e.target.value) }} type="text" />
                    </div>
                    <div>
                        <label>Are You Working?</label>
                        <label >No</label>
                        <input checked={false} onChange={() => {
                            setWorking(false)
                        }} type="radio" />
                        <label> Yes</label>
                        <input placeholder="" checked={false} onChange={() => {
                            setWorking(true)
                        }} type="radio" />
                    </div>

                    {/* Optionla rendeirg SHIT */}
                    {working ? <div>
                        <label>Work Time</label>
                        <input className="text-black px-4 py-1" placeholder="Work Time" value={workTime} onChange={(e) => { setWorkTime(e.target.value) }} type="time" />
                    </div> :
                        ""}

                    <div>
                        <label>Wake Up Time</label>
                        <input className="text-black px-4 py-1" required placeholder="Wake up time" value={wakeUpTime} onChange={(e: any) => {
                            setWakeUpTime(e.target.value);
                            console.log("Wake up time is :", wakeUpTime)
                        }} type="time" />
                    </div>
                    <div>
                        <label>Your Long Term Goal</label>
                        <input className="text-black px-4 py-1" required placeholder="Long term goal" value={lognTermGoal} onChange={(e) => { setLognTermGoal(e.target.value) }} type="text" />
                    </div>
                    <div>
                        <label>Your Short Term Goal</label>
                        <input className="text-black px-4 py-1" required placeholder="short term goal" value={shortTermGoal} onChange={(e) => { setShortTermGoal(e.target.value) }} type="text" />
                    </div>
                    <button type="submit" className="px-5 my-10  py-2 bg-neutral-700 rounded uppercase">Plan It</button>
                </form>
            </div>
        </section>
    );
}

