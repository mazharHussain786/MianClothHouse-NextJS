import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role:
    {
      role: { type: String, default: "user" },
    }
  },
  { timestamps: true }
);

export const userModel =mongoose.models.User || mongoose.model("User", UserSchema);
