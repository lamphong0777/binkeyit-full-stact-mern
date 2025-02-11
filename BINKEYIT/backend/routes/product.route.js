import { Router } from "express";
import {admin} from '../middleware/admin.js';
import auth from '../middleware/auth.js'
import { addProductController, deleteProductDetailsController, getProductByCategoryAndSubCategoryController, getProductByCategoryController, getProductController, getProductDetailsController, searchProductController, updateProductDetailsController } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/get', getProductController);
productRouter.post('/create', auth, admin, addProductController);
productRouter.post('/get-product-by-category', getProductByCategoryController);
productRouter.post('/get-pruduct-by-category-and-subcategory', getProductByCategoryAndSubCategoryController);
productRouter.post('/get-product-details', getProductDetailsController);

productRouter.put('/update-product-details', auth, admin, updateProductDetailsController);
productRouter.delete('/delete-product', auth, admin, deleteProductDetailsController);

productRouter.post('/search-product', searchProductController);


export default productRouter;