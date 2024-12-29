import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectMongoDB from "./config/connectMongoDB.js";
dotenv.config();

import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";
import catRoute from "./routes/cat.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/cats", catRoute);

app.get("*", (req, res) => {
  res.status(404).send("Route Not Found");
});

app.use((err, req, res, next) => {
  try {
    err.status = err.status || 500;
    err.message = err.message || "Internal Server Error";
    
    res.status(err.status).json({
      con: false,
      msg: err.message,
    });
  } catch (error) {
    res.status(500).json({
      con: false, 
      msg: "Error in error handler"
    });
  }
});


app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
