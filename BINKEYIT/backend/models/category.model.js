import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});

const CategoryModel = mongoose.model("category", CategorySchema);

export default CategoryModel;