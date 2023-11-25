import HistoryModel from '../models/history.js'

const getHistory = async (req, res) => {
  try {

    const userData = req.userData
    // Tìm user trong cơ sở dữ liệu với userId đã cho
    const userHistory = await HistoryModel.find({ userId: userData.userId });

    if (userHistory && userHistory.length > 0) {
      // Nếu user tồn tại, trả về thông tin history của user
      // return res.status(200).json({
      //   success: true,
      //   data: {
      //     detail: userHistory.detail,
      //   }
      // });
      const detailArray = userHistory.map(item => item.detail).flat();
      return res.status(200).json({
        success: true,
        data: detailArray
      });
    } else {
      // Nếu user không tồn tại, trả về thông báo lỗi hoặc mã trạng thái 404
      return res.status(404).json({ message: "Không tìm thấy lịch sử đặt hàng cho người dùng này." });
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi server." });
  }
}

export default {
  getHistory,

}