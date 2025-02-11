import mongoose, { mongo } from "mongoose";

const CartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product"
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const CartProductModel = mongoose.model("cartProduct", CartProductSchema);
export default CartProductModel;