import Tracker from "@/models/Tracker.model";
import Database from "@/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { title } = await req.json();
        if (!title) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 },
            );
        }

        await Database();
        const data = { title };
        const newTracker = await Tracker.create(data);
        console.log(">>> ~ file: route.ts:18 ~ POST ~ newTracker:", newTracker);

        if (newTracker) {
            return NextResponse.json({ success: true }, { status: 201 });
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
