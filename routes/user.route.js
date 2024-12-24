import express from "express";
import { register ,login,logout,dummyRateLimit} from "../controllers/user.controller.js";
import { validateBody } from "../utils/validator.js";
import{registerSchema,loginSchema} from "../utils/schema.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", logout);
router.get("/dummy-rate-limit", dummyRateLimit);
export default router;

