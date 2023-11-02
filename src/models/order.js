import mongoose from "mongoose";

// Định nghĩa Schema
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type:String,
        required: true,
    },
    detail:  [{
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
const Order = mongoose.model('Order', orderSchema);

export default Order;
