import Tracker from "@/models/Tracker.model";
import Database from "@/utils/Database";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 },
            );
        }

        await Database();
        // previousData
        const previousData = await Tracker.findById(id);

        if (!previousData) {
            return NextResponse.json(
                { success: false, message: "Tracker not found" },
                { status: 404 },
            );
        }

        const updatedData = await Tracker.findByIdAndUpdate(id, { status: 1 }, { new: true });

        if (updatedData) {
            return NextResponse.json({ success: true, data: updatedData }, { status: 200 });
        }

        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 400 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}
