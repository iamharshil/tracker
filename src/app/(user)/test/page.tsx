"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BsFillPlayFill } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";

export default function Temp() {
    const [trackerList, setTrackerList] = useState<[]>([]);
    const [loader, setLoader] = useState<boolean>(true);
    const [isTrackerRunning, setIsTrackerRunning] = useState<boolean>(false);
    const [trackerId, setTrackerId] = useState<string>("");
    const [trackerInput, setTrackerInput] = useState<string>("");

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
            } else {
                console.log("response error:", response?.status, response?.statusText);
            }
            return;
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

    useEffect(() => {
        getTrackerStatus();
        getTrackerList();
    }, []);
    return (
        <main className="h-screen w-screen bg-[#F8F8F8] flex">
            <div className="md:container mx-auto px-4">
                <header className="flex flex-col md:flex-row justify-between items-center mt-8 p-2 bg-[#FEFFFE] rounded-3xl border-1 border-slate-200 shadow-[#F8F8F8] shadow">
                    <div className="w-full md:w-2/3">
                        <input
                            className="w-full bg-[#F1F3F5] p-1 text-lg rounded-3xl px-4 shadow antialiased focus:outline-[#0D0E11]"
                            placeholder="Enter task here..."
                            onChange={handleTrackerInputChange}
                            value={trackerInput}
                            disabled={loader || isTrackerRunning}
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
                        <button
                            type="button"
                            className="bg-[#0D0E11] text-[#F9F7F7] p-1 text-xl rounded-3xl px-4 shadow antialiased focus:outline-[#DBE2EF] hover:bg-[#112D4E] transition-colors duration-300 disabled:bg-[#7A7D8D]"
                            disabled={trackerInput === ""}
                            onClick={handleTrackerButton}
                        >
                            {isTrackerRunning ? (
                                <IoCheckmarkDone className="m-1 mx-4" />
                            ) : (
                                <BsFillPlayFill className="m-1 mx-4" />
                            )}
                        </button>
                    </div>
                </header>
            </div>
        </main>
    );
}
