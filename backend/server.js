import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({origin:process.env.ORIGIN_URL}));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

  import userRouter from './routes/user.routes.js';
  import productRouter from './routes/product.routes.js'
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter)

