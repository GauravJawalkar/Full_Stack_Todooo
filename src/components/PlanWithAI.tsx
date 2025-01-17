"use client"
import React from 'react'

function PlanWithAI({ data }: any) {
    console.log("data is ", data)
    return (
        <div>
            {
                data.map(({ time, task, whatWillItHelpToAchieve }: any) => {
                    return <div>
                        <div>
                            {time}
                        </div>
                        <div>
                            {task}
                        </div>
                        <div>
                            {whatWillItHelpToAchieve}
                        </div>
                        <br />
                    </div>
                })
            }
        </div>
    )
}

export default PlanWithAI