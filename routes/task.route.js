import express from "express";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import { validateToken } from "../utils/validator.js";
const router = express.Router();

router.post("/create", validateToken(), createTask);
router.get("/all", validateToken(), getTasks);
router.get("/:id", validateToken(), getTask);
router.put("/:id", validateToken(), updateTask);
router.delete("/:id", validateToken(), deleteTask);

export default router;
