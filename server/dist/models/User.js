"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.ts
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String }, // Not required, depends on user providing it
    region: { type: String }, // Not required
    profilePhotoUrl: { type: String }, // Optional, can be set from Firebase
    favorites: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Cafe' }], // Array of cafe IDs
}, {
    timestamps: true // Automatically create 'createdAt' and 'updatedAt' fields
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
