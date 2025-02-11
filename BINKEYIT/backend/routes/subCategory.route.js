import { Router } from "express";
import auth from '../middleware/auth.js';
import {admin} from '../middleware/admin.js';
import { addSubcategoryController, deleteSubcategoryController, getAllSubcategoryController, updateSubcategoryController } from "../controllers/subCategory.controller.js";

const SubcategoryRouter = Router();

SubcategoryRouter.get('/all', getAllSubcategoryController);
SubcategoryRouter.post('/create', auth, admin, addSubcategoryController);
SubcategoryRouter.put('/update', auth, admin, updateSubcategoryController);
SubcategoryRouter.delete('/remove', auth, admin, deleteSubcategoryController);


export default SubcategoryRouter;