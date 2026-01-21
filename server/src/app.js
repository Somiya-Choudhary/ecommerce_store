import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import { seedProducts, seedUsers } from "./store/seed.js";
import { errorHandler } from "./middlewares/error.middleware.js";

export const app = express();

// Store Initialized
seedUsers();
seedProducts();

//middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", healthRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

// error middleware
app.use(errorHandler);