import mongoose from "mongoose";

// Định nghĩa Schema
const orderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    detail: [{
        id: String,
        thumbnail: String,
        productName: String,
        quantity: Number,
        price: String,
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
const Order = mongoose.model('Order', orderSchema);

export default Order;
