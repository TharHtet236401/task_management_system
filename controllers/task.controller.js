import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import { fError, fMsg } from "../utils/libby.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, category, deadline } =
      req.body;

    if (
      !title ||
      !description ||
      !status ||
      !priority ||
      !category ||
      !deadline
    ) {
      return fError(res, "All fields are required", 400);
    }

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof status !== "string" ||
      typeof priority !== "string" ||
      typeof category !== "string" ||
      typeof deadline !== "string"
    ) {
      return fError(res, "Invalid data type", 400);
    }

    const currentUser = await User.findOne({ _id: { $eq: req.user } });
    if (!currentUser) {
      return fError(res, "User not found", 404);
    }

    const task = await Task.create({
      user_id: currentUser._id,
      title,
      description,
      status,
      priority,
      category,
      deadline,
    });

    return fMsg(res, "Task created successfully", task, 201);
  } catch (error) {
    return fError(res, error.message, 500);
  }
};
