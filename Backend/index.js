import express from 'express'
import getProducts from './routes/getProducts.js'
import checkProducts from './routes/checkProducts.js'
import cors from "cors"
import path from "path"
const app = express();

const port = 3000;
const __dirname = path.resolve();

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use("/api/getProducts" , getProducts);
app.use("/api/checkProducts" , checkProducts)



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

if (process.env.NODE_ENV !== "test") {
  
  app.listen(port, () => {
    console.log(`Server is Listening on port http://localhost:${port}`);
  });
}

export default app;
