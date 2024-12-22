import { Router } from "express";

const router = Router();


router.route("/login",(req,res)=>{
  res.send("Login success")
})
export default router;
