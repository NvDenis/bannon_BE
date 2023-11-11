import jwt from 'jsonwebtoken'

    

const verifyToken = (req, res, next) => {
    try {
        const access_token = req?.headers?.authorization?.split(' ')[1];
        if (!access_token) return res.status(401).json({ msg: `You're not authenticated`, success: false });
        jwt.verify(access_token, process.env.ACCESS_SEC_KEY, (error, data) => {
            if (!data || error) {
                return res.status(401).json({ msg: 'Token is invalid', success: false });
            }
            // Nếu token hợp lệ, bạn có thể lưu dữ liệu từ token vào req để sử dụng trong các middleware sau này (nếu cần).
            req.userData = data;

            // Gọi next() để tiếp tục xử lý yêu cầu
            next();
        })



    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error', success: false });
    }

}


export default verifyToken