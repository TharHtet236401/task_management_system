import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./config/connectMongoDB.js";
dotenv.config();

import userRoute from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);
app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
