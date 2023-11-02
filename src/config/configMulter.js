import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.headers['upload-type'] === "hat") {
            cb(null, './public/images/hat'); // Thư mục lưu trữ tệp
        } else if (req.headers['upload-type'] === 'avatar') {
            cb(null, './public/images/avatar'); // Thư mục lưu trữ tệp

        }
    },
    filename: (req, file, cb) => {
        const fileName = Date.now()+ '-' + file.originalname;
        cb(null, fileName ); // Đặt tên tệp theo thời gian và tên gốc
        req.fileName = fileName;
    },
});
const upload = multer({ storage: storage });

export default upload