import express from 'express'
import upload from '../config/configMulter.js';
const router = express.Router();

router.post('/upload', upload.single('fileImg'), (req, res) => {
    try {
        if (!req.file) {
            // Nếu không có tệp nào được tải lên, gửi phản hồi lỗi
            return res.status(400).json({
                success: false,
                error: 'No file was uploaded.',
                msg: 'Upload file failed'
            });
        }

        // Thực hiện xử lý tệp và tên tệp ở đây

        return res.status(200).json({
            success: true,
            data: {
                fileUploaded: req.fileName
            },
            msg: 'Upload file successfully'
        });
    } catch (error) {
        // Bắt lỗi và gửi phản hồi lỗi
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'An error occurred while processing the file.',
            msg: 'Upload file failed'
        });
    }

})

export default router;