import mongoose from "mongoose";

// Định nghĩa Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    banner: {
        type: String, 
        required: true,
    },
    thumb: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
);

// Tạo Model
const Category = mongoose.model('Category', categorySchema);

export default Category;
