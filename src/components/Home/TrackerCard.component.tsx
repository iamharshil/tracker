"use client";

import moment from "moment";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";

export default function TrackerCard({ tracker, index }: { tracker: any; index: any }) {
    return (
        <div
            className="flex flex-col items-start justify-start bg-[#F8F8F8] border-2 border-[#FEFFFE] shadow-zing-300 shadow-md rounded-xl p-4 m-4"
            key={`${index}/${tracker.title}`}
        >
            {/* tracker list */}
            <h1 className="mt-1 text-2xl font-bold text-[#0D0E11] w-full text-nowrap truncate">
                {tracker.title}
            </h1>
            <div className="flex items-end justify-between w-full mt-4">
                <div>
                    <p className="text-sm text-slate-500">Start Time:</p>
                    <div className="flex items-end">
                        <p className="text-2xl font-extrabold font-sans">
                            {moment(tracker.createdAt).format("HH:mm")}
                        </p>
                        <p className="text-sm font-light ms-2 pb-1 text-slate-500">
                            {moment(tracker.createdAt).format("DD MMM, yyyy")}
                        </p>
                    </div>
                </div>
                {tracker?.status === 0 ? (
                    <div className="flex items-end justify-center">
                        <button type="button" className="bg-[#0D0E11] text-white rounded-lg p-3">
                            <BsFillPauseFill />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col justify-end items-end">
                        <p className="text-sm text-slate-500">Total Hour:</p>
                        <div className="flex items-end">
                            <p className="text-2xl font-extrabold font-sans">
                                {moment
                                    .utc(
                                        moment
                                            .duration(
                                                moment(tracker?.updatedAt).diff(
                                                    moment(tracker?.createdAt),
                                                ),
                                            )
                                            .asMilliseconds(),
                                    )
                                    .format("HH:mm")}
                            </p>
                        </div>
                    </div>
                    // <div className="flex items-end justify-center">
                    //     <button type="button" className="bg-[#0D0E11] text-white rounded-lg p-3">
                    //         <BsFillPlayFill />
                    //     </button>
                    // </div>
                )}
            </div>
        </div>
    );
}
