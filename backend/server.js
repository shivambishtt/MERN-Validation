import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: ".env",
});

const app = express();
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
