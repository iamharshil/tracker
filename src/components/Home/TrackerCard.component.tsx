"use client";

import moment from "moment";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";

export default function TrackerCard({ tracker, index }) {
    return (
        <div
            className="flex flex-col items-start justify-start border-5 border-slate-200 shadow-zing-300 shadow-md rounded-lg p-4 m-4"
            key={`${index}/${tracker.title}`}
        >
            {/* tracker list */}
            <h1 className="mt-1 text-2xl font-bold text-gray-700 w-full text-nowrap truncate">
                {tracker.title}
            </h1>
            {tracker?.status === 2 && (
                <div className="flex text-md text-gray-700">
                    <TbTargetArrow className="me-1 mt-1" />
                    <p>Completed</p>
                </div>
            )}
            <div className="flex items-end justify-between w-full mt-6">
                <div>
                    <p className="text-sm">Start Time</p>
                    <p className="text-2xl font-bold">
                        {moment(tracker.createdAt).format("HH:mm")}
                    </p>
                </div>
                <div className="flex items-end justify-center">
                    <button type="button" className="bg-black text-white rounded-lg p-3">
                        <BsFillPlayFill />
                    </button>
                </div>
            </div>
        </div>
    );
}
