import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
        default: ""
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "category"
        }
    ]
}, {
    timestamps: true
});

const SubCategoryModel = mongoose.model("subCategory", SubCategorySchema);

export default SubCategoryModel;