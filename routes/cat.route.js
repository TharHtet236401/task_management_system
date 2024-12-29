import express from "express";
import { getCategories, createCategory } from "../controllers/cat.controller.js";
import { validateToken, validateBody } from "../utils/validator.js";
import { categorySchema } from "../utils/schema.js";

const router = express.Router();

router.get("/", validateToken(), getCategories);
router.post("/", validateToken(), validateBody(categorySchema), createCategory);

export default router;

