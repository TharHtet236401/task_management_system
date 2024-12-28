import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { validateToken, validParams } from "../utils/validator.js";
import { idSchema } from "../utils/schema.js";
const router = express.Router();

router.post("/create", validateToken(), createTask);
router.get("/all", validateToken(), getTasks);
router.get("/:id", validateToken(), validParams(idSchema, "id"), getTask);
router.put("/:id", validateToken(), validParams(idSchema, "id"), updateTask);
router.delete("/:id", validateToken(), validParams(idSchema, "id"), deleteTask);

export default router;
