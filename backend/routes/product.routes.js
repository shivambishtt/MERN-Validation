import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { addProduct } from "../controllers/product.controller.js"

const router = Router()

router.route("/add-product").post(verifyJWT, addProduct)


export default router;