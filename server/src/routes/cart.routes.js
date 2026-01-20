import { Router } from "express";
import { addItemToCart } from "../controllers/cart.controller.js";
import { validateAddToCart } from "../middlewares/validateAddToCart.js";

const router = Router();

router.post("/items", validateAddToCart, addItemToCart);

export default router;
