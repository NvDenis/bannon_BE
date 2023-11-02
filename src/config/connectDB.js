import mongoose from 'mongoose';


const connectDB = () => {
    // Kết nối với MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  // Xử lý sự kiện kết nối thành công
  db.on('connected', () => {
    console.log('Đã kết nối với MongoDB');
  });
  
  // Xử lý sự kiện lỗi kết nối
  db.on('error', (err) => {
    console.error(`Lỗi kết nối MongoDB: ${err}`);
  });
}

export default connectDB;