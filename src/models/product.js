import mongoose from "mongoose";

// Định nghĩa Schema
const productSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        required: true,
    },
    slider: [{
        type: String,
        required: true,
    }],
    mainText: {
        type: String,
        required: true,

    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Tham chiếu đến collection 'Category'
        required: true,
    },
    price: {
        type: String,
        required: true,

    },
    sold: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true
    }
);

// Tạo Model
const Product = mongoose.model('Product', productSchema);

export default Product;
