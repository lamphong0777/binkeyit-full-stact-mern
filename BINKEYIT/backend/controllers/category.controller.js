import CategoryModel from '../models/category.model.js';
import SubCategoryModel from '../models/subCategory.model.js';
import ProductModel from '../models/product.model.js';

export const addCategoryController = async (req, res) => {
    try {
        const { name, image } = req.body;

        if (!name || !image) {
            return res.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            });
        }

        const addCategory = new CategoryModel({
            name,
            image
        });

        const saveCategory = await addCategory.save();

        if (!saveCategory) {
            return res.status(500).json({
                message: "Not Created",
                error: true,
                success: false
            })
        }

        return res.json({
            message: "Add Category",
            data: saveCategory,
            success: true,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getAllCategoryController = async (req, res) => {
    try {
        let { page, limit } = req.query;
        
        // Chuyển đổi sang số nguyên và đặt giá trị mặc định
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 0;
        
        // Tính toán số lượng tài liệu cần bỏ qua
        const skip = (page - 1) * limit;
        let data = [];
        if(limit > 0) {
            // Lấy danh sách danh mục có phân trang
            data = await CategoryModel.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
        } else {
            data = await CategoryModel.find()
                .sort({ createdAt: -1 })
        }

        // Đếm tổng số danh mục
        const total = await CategoryModel.countDocuments();

        return res.json({
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1
            },
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};


export const updateCategoryController = async (req, res) => {
    try {
        const { _id, name, image } = req.body;

        const updateCategory = await CategoryModel.updateOne({
            _id: _id
        }, {
            name: name,
            image: image
        })

        return res.json({
            message: "Category updated successfully.",
            error: false,
            success: true,
            data: updateCategory
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}


export const deleteCategoryController = async (req, res) => {
    try {
        const { _id } = req.body;

        const checkSubCategory = await SubCategoryModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments();

        const checkProduct = await ProductModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments();

        if (checkProduct > 0 && checkSubCategory > 0) {
            return res.status(400).json({
                message: "Category is already use can't delete",
                error: true,
                success: false
            })
        }

        const deleteCategory = await CategoryModel.deleteOne({ _id: _id });

        return res.json({
            message: "Delete category successfully.",
            data: deleteCategory,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}