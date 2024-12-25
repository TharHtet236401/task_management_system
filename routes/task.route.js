import express from "express";
import { createTask } from "../controllers/task.controller.js";
import { validateToken } from "../utils/validator.js";
const router = express.Router();

router.post("/create", validateToken(), createTask);

export default router;
