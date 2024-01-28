import Tracker from "@/models/Tracker.model";
import Database from "@/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await Database();

        const tracker = await Tracker.findOne().sort({ createdAt: -1 });
        if (tracker) {
            return NextResponse.json({ data: tracker }, { status: 200 });
        }
        return NextResponse.json({ message: "No pending trackers." }, { status: 404 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}
