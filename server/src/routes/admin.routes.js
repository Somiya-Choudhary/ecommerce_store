import { Router } from "express";
import { getAdminSummary } from "../controllers/admin.controller.js";

const router = Router();

// Admin: summary stats
router.get("/summary", getAdminSummary);

export default router;
