import SubCategoryModel from '../models/subCategory.model.js';

export const addSubcategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body;

        if(!name || !image || !category[0]) {
            return res.status(400).json({
                message: "Provide required fields",
                error: true,
                success: false
            });
        }

        const payload = {
            name,
            image,
            category
        }

        const newSubcategory = new SubCategoryModel(payload);
        const saveSubcategory = await newSubcategory.save();

        return res.json({
            message : "Sub Category Created",
            data: saveSubcategory,
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
}

export const getAllSubcategoryController = async (req, res) => {
    try {
        const subcategories = await SubCategoryModel.find().sort({ createdAt: -1 }).populate('category');

        return res.json({
            data: subcategories,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const updateSubcategoryController = async (req, res) => {
    try {
        const { _id, name, image, category } = req.body;
        const checkSub = await SubCategoryModel.findById(_id);
        if(!checkSub) {
            return res.status(400).json({
                message : "Check subcategory id",
                error : true,
                success : false
            })
        }

        const updateSubcategory = await SubCategoryModel.findByIdAndUpdate(_id, {
            name: name,
            image: image,
            category: category
        });
        return res.json({
            message : 'Updated Successfully',
            data : updateSubcategory,
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const deleteSubcategoryController = async (req, res) => {
    try {
        const { _id } = req.body;

        const deleteData = await SubCategoryModel.findByIdAndDelete(_id);

        return res.json({
            message : "Delete successfully",
            data : deleteData,
            error : false,
            success : true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}