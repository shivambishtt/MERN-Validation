import {Router} from "express"
import { addProduct } from "../controllers/product.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/add-product").post(verifyJWT,addProduct)


export default router;