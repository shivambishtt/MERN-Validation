import mongoose, { Schema } from "mongoose";
import { type } from "os";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
