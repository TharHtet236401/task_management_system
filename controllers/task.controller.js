import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import { fError, fMsg } from "../utils/libby.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, category, deadline } =
      req.body;

    if (!title) {
      return fError(res, "At least title is required", 400);
    }

    if (typeof title !== "string") {
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

export const getTasks = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: { $eq: req.user } });
    if (!currentUser) {
      return fError(res, "User not found", 404);
    }
    const tasks = await Task.find({ user_id: currentUser._id });
    return fMsg(res, "Tasks fetched successfully", tasks, 200);
  } catch (error) {
    return fError(res, error.message, 500);
  }
};

export const getTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return fError(res, "Invalid task ID format", 400);
    }

    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return fError(res, "Task not found", 404);
    }
    return fMsg(res, "Task fetched successfully", task, 200);
  } catch (error) {
    return fError(res, error.message, 500);
  }
};

export const updateTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return fError(res, "Invalid task ID format", 400);
    }
    if (!req.params.id) {
      return fError(res, "Task id is required", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return fError(res, "Invalid task ID format", 400);
    }
    const { title, description, status, priority, category, deadline } =
      req.body;

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
    if (
      !title &&
      !description &&
      !status &&
      !priority &&
      !category &&
      !deadline
    ) {
      return fError(res, "At least one field is required", 400);
    }
    const editTask = await Task.findOne({
      _id: { $eq: req.params.id },
      user_id: { $eq: req.user },
    });
    if (!editTask) {
      return fError(res, "Task not found", 404);
    }
    const newTask = {
      title: title || editTask.title,
      description: description || editTask.description,
      status: status || editTask.status,
      priority: priority || editTask.priority,
      category: category || editTask.category,
      deadline: deadline || editTask.deadline,
    };
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    return fMsg(res, "Task updated successfully", task, 200);
  } catch (error) {
    return fError(res, error.message, 500);
  }
};

export const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return fError(res, "Task id is required", 400);
    }
    const task = await Task.findOneAndDelete({
      _id: { $eq: req.params.id },
      user_id: { $eq: req.user },
    });
    if (!task) {
      return fError(res, "Task not found", 404);
    }
    return fMsg(res, "Task deleted successfully", task, 200);
  } catch (error) {
    return fError(res, error.message, 500);
  }
};

export const filterTasks = async (req, res) => {
  try {
    const { status, priority, category } = req.query;

    // Build filter object based on provided query parameters
    const filter = { user_id: req.user };

    // Add filters only if they exist and are non-empty
    if (status && status.trim()) {
      filter.status = status.trim();
    }

    if (priority && priority.trim()) {
      filter.priority = priority.trim();
    }

    if (category && category.trim()) {
      filter.category = category.trim();
    }

    const tasks = await Task.find(filter);

    if (!tasks.length) {
      return fMsg(res, "No tasks found matching the filters", [], 200);
    }

    return fMsg(res, "Tasks retrieved successfully", tasks, 200);
  } catch (error) {
    return fError(res, error.message, 500);
  }
};
