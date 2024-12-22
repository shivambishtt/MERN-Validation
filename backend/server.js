import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js';

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(express.json({ limit: "20kb" }));

dotenv.config({
  path: ".env",
});

export const PORT = process.env.PORT || 6000;

connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Home Page");
    });
    app.listen(PORT, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MONGO DB Connection failed !! ${err}`);
  });

app.use("/auth", userRouter);
