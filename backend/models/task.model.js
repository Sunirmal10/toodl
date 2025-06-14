import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
      todo: {
        type: String,
        required: true
      },
      status: {
        type: String,
        default: "pending"
      },
      checked: {
        type: Boolean,
        default: false
      },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Task", taskSchema)