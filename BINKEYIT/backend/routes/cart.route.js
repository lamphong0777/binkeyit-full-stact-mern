import { Router } from "express";
import auth from '../middleware/auth.js';
import { addToCartController, deleteCartItemQtyController, getCartItemController, updateCartItemQtyController } from "../controllers/cart.controller.js";

const CartRouter = Router();

CartRouter.get("/get", auth, getCartItemController);
CartRouter.post("/create", auth, addToCartController);
CartRouter.put("/update-qty", auth, updateCartItemQtyController);
CartRouter.delete("/delete-cart-item", auth, deleteCartItemQtyController);

export default CartRouter;