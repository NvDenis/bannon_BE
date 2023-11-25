
import OrderModel from '../models/order.js'
import HistoryModel from '../models/history.js'

const hanldeOrder = async (req, res) => {
  try {
    const { userId, fullName, phone, email, address, note, detail, totalPrice } = req.body;

    if (!userId || !fullName || !phone || !email || !address || !detail || !totalPrice) {
      return res.status(400).json({
        status: 'error',
        message: 'Vui lòng nhập đầy đủ thông tin.',
      });
    }
                   
    const newOrder = new OrderModel({
      fullName,
      phone,
      email,
      address,
      note,
      detail,
      totalPrice,
    });
    await newOrder.save();

    const newHistory = new HistoryModel({
      fullName,
      phone,
      email,
      userId,
      detail,
      totalPrice,

    })
    await newHistory.save();

    res.status(201).json({
      success: true,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export default {
  hanldeOrder,
};


