import express from "express";
import getProducts from "./routes/getProducts.js";
import checkProducts from "./routes/checkProducts.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Change this in production if needed
    credentials: true,
  })
);

// API routes
app.use("/api/getProducts", getProducts);
app.use("/api/checkProducts", checkProducts);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  // Fallback for React Router
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}


// Start server if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is Listening on port http://localhost:${port}`);
  });
}

export default app;
