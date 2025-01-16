import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
    const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API}`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const reqBody = await request.json();
    console.log("My req body is", reqBody);

    const { name, age, working, workTime, wakeUpTime, lognTermGoal, shortTermGoal } = reqBody;

    let notWorking;
    if (working === "") {
        notWorking = true;
    }

    // Creating a promt by using the above goten values . Would update later

    const prompt = "Explain steps to learn Javascript. Give me the steps into array of objects ";
    const newPrompt = `Hello my name is ${name}.I am ${age} old. ${notWorking ? "I am currently not working" : `I am working from ${workTime}`}.I wakeup at ${wakeUpTime}.My longTerm goal is ${lognTermGoal} and my short term goal is ${shortTermGoal}. Create me a optimal time-wise plan  using this information keeping in mind the longterm and short term goals, also add some gym-time to it. Give me this plan in the form of array of objects`

    console.log(newPrompt)

    try {
        const result = await model.generateContent(`${newPrompt}`);
        console.log(result.response.text());

        return NextResponse.json({ data: result?.response.text() }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }

}
