import mongoose from "mongoose";

// Định nghĩa Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Kiểm tra tính hợp lệ của địa chỉ email
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email address.`,

    },

  },
  phone: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  role: {
    type: String,
    default: 'USER',
  },
  wishList:[
    {
      thumbnail: String,
      productName: String,
      quantity: Number,
      _id: String,
    }
  ],
  refreshToken: {
    type: String
  }
},
  {
    timestamps: true
  }
);

// Tạo Model
const User = mongoose.model('User', userSchema);

export default User;
