import { Router } from "express";
import { getAdminSummary, generateCouponIfEligibleAdmin } from "../controllers/admin.controller.js";

const router = Router();

// Admin: summary stats
router.get("/summary", getAdminSummary);

// Admin: generate coupon if Nth-order condition is satisfied
router.post("/coupon/generate", generateCouponIfEligibleAdmin);

export default router;
