import express from "express";
import { getCategories, createCategory } from "../controllers/cat.controller.js";
import { validateToken } from "../utils/validator.js";


const router = express.Router();

router.get("/", validateToken(), getCategories);
router.post("/", validateToken(), createCategory);

export default router;

