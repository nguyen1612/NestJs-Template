import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true
    }
}, {
    timestamps: { createdAt: "created_at", updatedAt: false }
});

export const UserModel = mongoose.model('user', UserSchema);