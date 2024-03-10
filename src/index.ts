import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/Routes";
dotenv.config();
const app = express();
mongoose
  .connect(process.env.MONGO_CONNECT as string, {})
  .then(() => {
    console.log("Db connection successful ⚡️");
  })
  .catch((err) => {
    console.error(err.message);
  });

app.use(
  cors({
    origin: process.env.LOCAL_HOST,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
