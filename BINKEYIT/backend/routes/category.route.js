import { Router } from "express";

import auth from '../middleware/auth.js';
import {admin} from '../middleware/admin.js';
import { addCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.get('/all', getAllCategoryController);
categoryRouter.post('/create', auth, admin, addCategoryController);
categoryRouter.put('/update', auth, admin, updateCategoryController);
categoryRouter.delete('/remove', auth, admin, deleteCategoryController);

export default categoryRouter;