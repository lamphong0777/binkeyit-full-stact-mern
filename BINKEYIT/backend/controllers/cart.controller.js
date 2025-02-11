import CartProductModel from '../models/cartProduct.model.js';
import UserModel from '../models/user.model.js';

export const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        if (!productId) {
            return res.status(400).json({
                message: "Provide product id",
                error: true,
                success: false
            });
        }

        const checkCartExist = await CartProductModel.findOne({
            userId: userId,
            productId: productId
        });

        if (checkCartExist) {
            return res.json({
                message: "Product already in cart.",
                error: true,
                success: false
            });
        }

        const newCartItem = new CartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        });

        const saveCartItem = await newCartItem.save();

        // Save user cart
        const updateUserCart = await UserModel.updateOne({ _id: userId }, {
            $push: {
                shopping_cart: productId
            }
        });

        return res.json({
            message: "Item added to cart.",
            data: saveCartItem,
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

export const getCartItemController = async (req, res) => {
    try {
        const userId = req.userId; // auth middleware
        const cartItem = await CartProductModel.find({
            userId: userId
        }).populate('productId')


        return res.json({
            message: "Get cart item.",
            data: cartItem,
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

export const updateCartItemQtyController = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id, qty } = req.body;

        if(!_id || !qty) {
            return res.status(400).json({
                message: "Provide product _id, qty",
                error: true,
                success: false
            });
        }

        const updateCartItem = await CartProductModel.updateOne({
            _id: _id,
            userId: userId
        }, {
            quantity: qty
        });

        return res.json({
            message: "Update cart sucessfully.",
            data: updateCartItem,
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

export const deleteCartItemQtyController = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id } = req.body;

        if(!_id) {
            return res.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            });
        }
        // Detele cart item in cart collection
        const deleteCartItem = await CartProductModel.deleteOne({
            _id: _id,
            userId: userId
        });

        return res.json({
            message: "Delete cart item sucessfully.",
            data: deleteCartItem,
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
