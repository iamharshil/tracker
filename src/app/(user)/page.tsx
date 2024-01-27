"use client";

import Tracker from "@/components/Home/Tracker.component";

import { useEffect, useState } from "react";

interface TrackerData {
    name: string;
    // Add other properties here if needed
}

export default function Home() {
    const [trackerList, setTrackerList] = useState<TrackerData[]>([]); // Specify the type of trackerList
    useEffect(() => {
        (async () => {
            await fetch("/api/tracker/read")
                .then((res) => res.json())
                .then((data) => {
                    setTrackerList(data?.data);
                });
        })();
    }, []);
    return (
        <main className="h-screen w-screen bg-[#F9F7F7] hidden xl:flex">
            <div className="md:container mx-auto px-4">
                {/* tracker card */}
                <Tracker />

                {/* tracker list card */}
                <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <h1 className="text-2xl font-bold text-gray-700">Tracker List</h1>
                    </div>

                    {/* tracker list */}
                    {trackerList.map((tracker) => (
                        <div
                            className="flex flex-col items-center justify-center w-full h-full"
                            key={tracker.id} // Use a unique identifier from the tracker object as the key
                        >
                            {/* tracker list */}
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <div className="flex flex-col items-center justify-center w-full h-full">
                                    <h1 className="text-2xl font-bold text-gray-700">
                                        {tracker.title}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
