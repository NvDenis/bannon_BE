import mongoose from "mongoose";
import Product from "./product";

// Định nghĩa Schema
const historySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    detail: [{
        thumbnail: String,
        productName: String,
        quantity: Number,
        _id: String,
    }],

    totalPrice: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
);

// Tạo Model
const History = mongoose.model('History', historySchema);

export default History;
