"use client";

import React from "react";
import moment from "moment";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { apiCall } from "@/helpers/common";

export default function TrackerProgressBar() {
    const [taskInput, setTaskInput] = React.useState("");
    const [currentTime, setCurrentTime] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [taskStatus, setTaskStatus] = React.useState(false);
    const [trackerLoader, setTrackerLoader] = React.useState(false);

    React.useEffect(() => {
        setInterval(() => {
            setCurrentTime(moment().format("HH:mm:ss"));
        }, 1000);
    }, []);

    function handleTaskInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskInput((prev) => e.target.value);
    }

    async function handleTaskStatus(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (trackerLoader || taskStatus) return;

        setTrackerLoader(true);
        const response: any = await apiCall("POST", "/api/tracker/create", { title: taskInput });
        console.log(
            ">>> ~ file: Tracker.component.tsx:40 ~ handleTaskStatus ~ response:",
            response?.status,
        );
        if (response?.status === 201) {
            setStartTime(moment().format("HH:mm:ss"));
            setTaskStatus(true);
            setTaskInput("");
        } else {
            setTaskStatus(false);
        }
    }

    return (
        <div className="flex justify-between items-center mt-8 p-2 rounded-3xl border-1 border-slate-200 shadow-[#DBE2EF] shadow">
            <div className="w-2/3">
                <input
                    className="w-full bg-slate-200 p-1 text-lg rounded-3xl px-4 shadow antialiased focus:outline-[#DBE2EF]"
                    placeholder="Enter task here..."
                    onChange={handleTaskInputChange}
                />
            </div>
            <div className="flex justify-between gap-4 items-center">
                {taskStatus && (
                    <button
                        type="button"
                        className="bg-[#3F72AF] text-[#F9F7F7] p-1 text-xl rounded-3xl px-4 shadow antialiased focus:outline-[#DBE2EF] hover:bg-[#112D4E] transition-colors duration-300 disabled:bg-[#DBE2EF]"
                    >
                        <IoCheckmarkDone className="m-1" />
                    </button>
                )}
                <div className="flex justify-center items-center gap-2 text-2xl text-zinc-600">
                    {taskStatus ? (
                        <>
                            <p className="font-bold font-mono">23:11</p>
                            <FaArrowRight className="text-lg " />
                            <p className="font-bold font-mono">00:57</p>
                        </>
                    ) : (
                        <p className="font-bold font-mono text-gray-600">
                            {currentTime ? currentTime : "00:00"}
                        </p>
                    )}
                </div>
                <button
                    type="button"
                    className="bg-[#3F72AF] text-[#F9F7F7] p-1 text-xl rounded-3xl px-4 shadow antialiased focus:outline-[#DBE2EF] hover:bg-[#112D4E] transition-colors duration-300 disabled:bg-[#DBE2EF]"
                    disabled={!taskStatus && taskInput === ""}
                    onClick={handleTaskStatus}
                >
                    {taskStatus ? (
                        <BsFillPauseFill className="m-1 mx-4" />
                    ) : (
                        <BsFillPlayFill className="m-1 mx-4" />
                    )}
                </button>
            </div>
        </div>
    );
}
