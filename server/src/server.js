import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import { seedProducts, seedUsers } from "./store/seed.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Store Initialized
seedUsers();
seedProducts();

//middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", healthRoutes);
app.use("/api/cart", cartRoutes);

// error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
