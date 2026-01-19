import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
