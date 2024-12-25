import express from "express";
import { createTask, getTasks } from "../controllers/task.controller.js";
import { validateToken } from "../utils/validator.js";
const router = express.Router();

router.post("/create", validateToken(), createTask);
router.get("/all", validateToken(), getTasks);

export default router;
