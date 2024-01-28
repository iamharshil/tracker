import Tracker from "@/models/Tracker.model";
import Database from "@/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await Database();
        // if premium user show all data else latest 6.
        // const limit: number = 6;

        const trackerList = await Tracker.find().sort({ createdAt: -1 });

        if (trackerList) {
            return NextResponse.json({ success: true, data: trackerList }, { status: 200 });
        }

        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 400 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Internal server error!" },
            { status: 500 },
        );
    }
}
