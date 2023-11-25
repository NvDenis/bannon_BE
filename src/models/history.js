import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
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
    userId: {
        type: String,
        required: true,
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

const History = mongoose.model('History', historySchema);

export default History;
