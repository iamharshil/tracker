"use client";

import React from "react";
import moment from "moment";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";

interface TrackerData {
    _id?: string;
    title?: string;
    createdAt?: string;
    // Add other properties here if needed
}

export default function TrackerProgressBar() {
    const [trackerStatus, setTrackerStatus] = React.useState<TrackerData | null>(null); // Specify the type of trackerList
    const [taskInput, setTaskInput] = React.useState("");
    const [currentTime, setCurrentTime] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [taskStatus, setTaskStatus] = React.useState(false);
    const [trackerLoader, setTrackerLoader] = React.useState(false);
    const [currentIntervals, setCurrentIntervals] = React.useState<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        (async () => {
            setTrackerLoader(true);
            await fetch(`${process.env.BASE_URL}/api/tracker/status`, { cache: "no-cache" })
                .then((res) => res.json())
                .then((data) => {
                    setTrackerStatus(data?.data);
                    if (!data.data || data?.data?.status === 1) {
                        if (currentIntervals) clearInterval(currentIntervals);
                        const interval = setInterval(() => {
                            setCurrentTime(moment().format("HH:mm:ss"));
                        }, 1000);
                        setCurrentIntervals(interval);
                    } else {
                        setTaskStatus(true);
                        setStartTime(moment(data?.data?.createdAt).format("HH:mm:ss"));
                        setTaskInput(data?.data?.title);

                        if (currentIntervals) clearInterval(currentIntervals);
                        const interval = setInterval(() => {
                            const currentTime = moment();
                            const startTime = moment(data?.data?.createdAt);
                            const diff = moment.duration(currentTime.diff(startTime));
                            setCurrentTime(moment.utc(diff.asMilliseconds()).format("HH:mm:ss"));
                        }, 1000);
                        setCurrentIntervals(interval);
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setTrackerLoader(false));
        })();
    }, []);

    function handleTaskInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskInput((prev) => e.target.value);
    }

    async function handleTaskStatus(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (trackerLoader) return;

        setTrackerLoader(true);
        if (taskStatus) {
            await fetch(`${process.env.BASE_URL}/api/tracker/change-status`, {
                method: "PUT",
                body: JSON.stringify({ id: trackerStatus?._id || "" }),
                cache: "no-cache",
            })
                .then((res) => res.json())
                .then((data) => {
                    setTrackerStatus(null);
                    setTaskStatus(false);
                    setTaskInput("");

                    if (currentIntervals) clearInterval(currentIntervals);
                    const interval = setInterval(() => {
                        setCurrentTime(moment().format("HH:mm:ss"));
                    }, 1000);
                    setCurrentIntervals(interval);
                })
                .catch((error) => console.error(error))
                .finally(() => setTrackerLoader(false));
        } else {
            await fetch(`${process.env.BASE_URL}/api/tracker/create`, {
                method: "POST",
                body: JSON.stringify({ title: taskInput }),
                cache: "no-cache",
            })
                .then((res) => res.json())
                .then((data) => {
                    setTrackerStatus(data?.data);
                    if (!data.data || data?.data?.status === 1) {
                        if (currentIntervals) clearInterval(currentIntervals);
                        const interval = setInterval(() => {
                            setCurrentTime(moment().format("HH:mm:ss"));
                        }, 1000);
                        setCurrentIntervals(interval);
                    } else {
                        setTaskStatus(true);
                        setStartTime(moment(data?.data?.createdAt).format("HH:mm:ss"));
                        setTaskInput(data?.data?.title);

                        if (currentIntervals) clearInterval(currentIntervals);
                        const interval = setInterval(() => {
                            const currentTime = moment();
                            const startTime = moment(data?.data?.createdAt);
                            const diff = moment.duration(currentTime.diff(startTime));
                            setCurrentTime(moment.utc(diff.asMilliseconds()).format("HH:mm:ss"));
                        }, 1000);
                        setCurrentIntervals(interval);
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => setTrackerLoader(false));
        }
    }

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 p-2 bg-[#FEFFFE] rounded-3xl border-1 border-slate-200 shadow-[#F8F8F8] shadow">
            <div className="w-full md:w-2/3">
                <input
                    className="w-full bg-[#F1F3F5] p-1 text-lg rounded-3xl px-4 shadow antialiased focus:outline-[#0D0E11]"
                    placeholder="Enter task here..."
                    onChange={handleTaskInputChange}
                    value={taskInput}
                    disabled={taskStatus}
                />
            </div>
            <div className="flex justify-between gap-4 items-center">
                <div className="flex justify-center items-center gap-2 text-2xl text-zinc-600">
                    {taskStatus ? (
                        <>
                            <p className="font-bold font-mono">{startTime}</p>
                            <FaArrowRight className="text-lg " />
                            <p className="font-bold font-mono">{currentTime}</p>
                        </>
                    ) : (
                        <p className="font-bold font-mono text-gray-600">
                            {currentTime ? currentTime : "00:00"}
                        </p>
                    )}
                </div>
                <button
                    type="button"
                    className="bg-[#0D0E11] text-[#F9F7F7] p-1 text-xl rounded-3xl px-4 shadow antialiased focus:outline-[#DBE2EF] hover:bg-[#112D4E] transition-colors duration-300 disabled:bg-[#7A7D8D]"
                    disabled={(!taskStatus && taskInput === "") || trackerLoader}
                    onClick={handleTaskStatus}
                >
                    {taskStatus ? (
                        <IoCheckmarkDone className="m-1 mx-4" />
                    ) : (
                        <BsFillPlayFill className="m-1 mx-4" />
                    )}
                </button>
            </div>
        </div>
    );
}
