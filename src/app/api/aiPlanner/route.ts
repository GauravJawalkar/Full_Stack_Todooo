import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

export async function POST(request: NextRequest) {
    const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API}`);

    const schema = {
        description: "Planning the day to achieve longterm and short-term goals",
        type: SchemaType.ARRAY,
        items: {
            type: SchemaType.OBJECT,
            properties: {
                time: {
                    type: SchemaType.STRING,
                    description: "Time for as plan for the day"
                },
                task: {
                    type: SchemaType.STRING,
                    description: "Task to do as per plan of the day"
                },
                whatWillItHelpToAchieve: {
                    type: SchemaType.STRING,
                    description: "Explain the task and what it will help to achieve as per long-term and short-term goal"
                }
            },
            required: ['time', 'task', 'whatWillItHelpToAchieve']
        }
    }

    const model = genAI.getGenerativeModel(
        {
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            }
        }
    );

    const reqBody = await request.json();

    const { name, age, working, workTime, wakeUpTime, lognTermGoal, shortTermGoal, amPm, workAmPm } = reqBody;

    console.log("type of workAmPm", typeof workAmPm)
    let notWorking;
    if (working === "") {
        notWorking = true;
    }

    // Creating a promt by using the above goten values . Would update later

    const newPrompt = `Hello my name is ${name}.I am ${age} years old. ${notWorking ? "I am currently not working" : `I am working from ${workTime} ${workAmPm} to ${Number(workTime) + 8} `}.I wakeup at ${wakeUpTime} ${amPm}.My longTerm goal is ${lognTermGoal} and my short term goal is ${shortTermGoal}. Create me a optimal time-wise plan  using this information keeping in mind the longterm and short term goals, also add some gym-time to it.Take in consideration the time required to travel for gym and other things.Always give the task timinings in 12 hour format`

    console.log(newPrompt);

    try {
        const result = await model.generateContent(newPrompt);

        console.log(result.response.text());

        return NextResponse.json({ data: result?.response.text() }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }

}
