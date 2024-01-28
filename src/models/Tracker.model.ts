import { Schema, model, models } from "mongoose";

const TrackerSchema = new Schema(
    {
        title: { type: String, required: true },
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        // },
        // description: { type: String },
        status: {
            // 0: running, 1: completed
            type: Number,
            required: true,
            default: 0,
            enum: [0, 1],
        },
        // totalRunTime: { type: Number, default: 0 }, // in milliseconds
    },
    { timestamps: true, versionKey: false },
);

const Tracker = models.Tracker || model("Tracker", TrackerSchema);
export default Tracker;
