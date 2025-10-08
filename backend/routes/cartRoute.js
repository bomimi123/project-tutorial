import experss from "express";
import { addToCart, removeFromCart, getCart  } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";

const cartRouter = experss.Router();


cartRouter.post("/add",  authMiddleware, addToCart);
cartRouter.post("/remove",  authMiddleware, removeFromCart);
cartRouter.post("/get",  authMiddleware, getCart);

export default cartRouter;
