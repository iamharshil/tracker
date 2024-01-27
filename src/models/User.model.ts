import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
    {
        // name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        // email: { type: String, required: true, unique: true },
        // verified: { type: Boolean, required: true, default: false },
        lastLogin: { type: Date },
        authentication: {
            password: { type: String, required: true },
            verified: { type: Boolean, required: true, default: false, select: false },
            verificationToken: { type: String, required: true, select: false },
            passwordResetToken: { type: String, select: false },
            passwordResetTokenExpiry: { type: Date, default: Date.now, select: false },
            sessionToken: { type: String, select: false },
            refreshToken: { type: String, select: false },
            retryTimestamp: { type: Date, select: false },
            retryCount: { type: Number, default: 0, select: false },
        },
    },
    { timestamps: true, versionKey: false },
);

const User = models.User || model("User", UserSchema);
export default User;
