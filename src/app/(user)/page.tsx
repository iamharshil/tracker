"use client";

import TrackerProgressBar from "@/components/Home/Tracker.component";

import { useEffect, useState } from "react";
import TrackerCard from "@/components/Home/TrackerCard.component";

interface TrackerData {
    title: string;
    createdAt: string;
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
        // <main className="h-screen w-screen bg-[#F9F7F7] hidden xl:flex">
        <main className="h-screen w-screen bg-[#F9F7F7] flex">
            <div className="md:container mx-auto px-4">
                {/* tracker card */}
                <TrackerProgressBar />

                {/* tracker list card */}
                <div className="text-sm mt-4 p-1 px-4">
                    <h1>Previous Trackers</h1>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {/* tracker list */}
                    {trackerList.map((tracker, index) => (
                        <TrackerCard tracker={tracker} index={index} key={index + tracker._id} />
                    ))}
                </div>
            </div>
        </main>
    );
}
