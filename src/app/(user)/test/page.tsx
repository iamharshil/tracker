"use client";

import axios from "axios";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { toast } from "sonner";
import { BsFillPlayFill } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import moment from "moment";

export default function Temp() {
    const [trackerList, setTrackerList] = useState<[]>([]);
    const [loader, setLoader] = useState<boolean>(true);
    const [isTrackerRunning, setIsTrackerRunning] = useState<boolean>(false);
    const [trackerId, setTrackerId] = useState<string>("");
    const [trackerInput, setTrackerInput] = useState<string>("");
    const [difference, setDifference] = useState<moment.Duration | undefined>();

    async function getTrackerList() {
        const response = await axios.get(`${process.env.BASE_URL}/api/tracker/read`);
        if (response?.status === 200) {
            setLoader(false);
            setTrackerList(response.data.data);
            console.log(response.data);
        } else {
            console.log("response error:", response?.status, response?.statusText);
        }
    }

    async function getTrackerStatus() {
        const response = await axios.get(`${process.env.BASE_URL}/api/tracker/status`);
        if (response?.status === 200) {
            console.log(
                ">>> ~ file: page.tsx:28 ~ getTrackerStatus ~ response.data?.status:",
                response?.data?.data?.status,
            );
            if (response?.data?.data?.status === 0) {
                setIsTrackerRunning(true);
                setTrackerInput(response.data?.data?.title);
                setTrackerId(response.data?.data?._id);

                const createdAt = moment(response?.data?.data?.createdAt);
                const curr = moment(new Date().toISOString());
                // const diff = moment.duration(curr.diff(createdAt));
                setInterval(() => {
                    setDifference(moment.duration(moment().diff(createdAt)));
                }, 1000);
            }
        } else {
            console.log("response error:", response?.status, response?.statusText);
        }
    }
    function handleTrackerInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTrackerInput(e.target.value);
    }

    async function handleTrackerButton(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (isTrackerRunning) {
            const response = await axios.put(`${process.env.BASE_URL}/api/tracker/change-status`, {
                id: trackerId,
            });
            if (response?.data?.status === 200) {
                setTrackerInput("");
                setIsTrackerRunning(false);
                getTrackerList();
                return toast.success("Task completed.!!");
            }
            return console.log("response error:", response?.status, response?.statusText);
        }
        if (trackerInput === "") {
            return toast.error("Please enter task name.!!");
        }
        const response = await axios.post(`${process.env.BASE_URL}/api/tracker/create`, {
            title: trackerInput,
        });
        if (response?.data?.status === 200) {
            setIsTrackerRunning(true);
            setTrackerInput("");
            getTrackerList();
        } else {
            console.log("response error:", response?.status, response?.statusText);
        }
    }
    return (
        <main className="h-screen w-screen bg-[#121212] text-[#a1a1a6] flex">
            <div className="md:container mx-auto px-4">
                <header className="flex flex-col md:flex-row justify-between items-center mt-8 p-2 bg-[#151516] rounded-3xl border-1 border-[#282828] shadow-[#404040] shadow">
                    <div className="p-0 m-0">
                        <input
                            type="text"
                            placeholder="Enter task here..."
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                            className="bg-[#121212] px-4 text-2xl rounded-3xl border border-1 border-[#404040] focus:outline-none focus:border-[#282828] focus:ring-1 focus:ring-[#282828]"
                        />
                    </div>
                    <div className="flex justify-between gap-4 items-center">
                        {/* <div className="flex justify-center items-center gap-2 text-2xl text-zinc-600">
                            {isTrackerRunning ? (
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
                        </div> */}
                        {isTrackerRunning && difference && (
                            <div className="flex justify-center items-center gap-2 text-2xl text-zinc-600">
                                <p className="font-bold font-mono">
                                    {difference.hours().toString().padStart(2, "0")}h
                                </p>
                                <p className="font-bold font-mono">
                                    {difference.minutes().toString().padStart(2, "0")}m
                                </p>
                                <p className="font-bold font-mono">
                                    {difference.seconds().toString().padStart(2, "0")}s
                                </p>
                            </div>
                        )}
                        <button
                            type="button"
                            disabled={trackerLoader || titleInput?.length < 1}
                            onClick={handleTaskSubmit}
                            className="p-2 bg-[#121212] rounded-full border border-1 border-[#282828] font-extrabold focus:outline-none focus:border-[#282828] focus:ring-1 focus:ring-[#282828]"
                        >
                            <FaPlay className="m-auto" />
                        </button>
                    </div>
                </header>
            </div>
        </main>
    );
}
