"use client";

import axios from "axios";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { toast } from "sonner";

export default function Temp() {
    const [trackerLoader, setTrackerLoader] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [trackerStatus, setTrackerStatus] = useState(false);

    async function handleTaskSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        try {
            e.preventDefault();

            if (trackerLoader) {
                return toast.error("Task is already running, please wait...");
            }

            setTrackerLoader(true);
            if (trackerStatus) {
                return toast.error("Task is already completed, please reset...");
            }

            // Add your task logic here...
            let response = await axios.post("/api/tracker/create", { title: titleInput });
            if (response.status === 201) {
                response = response.data;
                setTitleInput("");
                setTrackerStatus(true);
                return toast.success("New task started successfully...");
            }
            console.log(">>> ~ file: page.tsx:28 ~ handleTaskSubmit ~ response:", response);
        } catch (error) {
            toast.error("Task has been failed, please try again...");
        } finally {
            setTrackerLoader(false);
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
                    <div>
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
