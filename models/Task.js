const uniqid = require("uniqid");
const mongoose = require("mongoose");
const sendErrorMessage = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");
const taskSchema = new mongoose.Schema(
  {
    //   userId: {
    //   type: mongoose.ObjectId,
    //   ref: "User",
    // }
    userId: {
      type: String,
      default: uniqid(),
    },
    taskId: {
      type: String,
      default: uniqid(),
    },
    taskName: {
      type: String,
      //required: [true, "task is required"],
      validate: {
        validator: function () {
          console.log("This is Task Validator", this);
          return this.taskName.trim().length;
        },
        message: "Enter Valid Task",
      },
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
    },
    sharedWith: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
  { strict: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
