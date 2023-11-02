import Category from "../models/category.js"
import ProductModel from '../models/product.js'







const uploadImgProduct = (req, res) => {
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
                fileUploaded: Date.now() + '-' + req.file.originalname
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
}

const insertProduct = async (req, res) => {
    try {
        const data = req.body;

        // Tạo một tài liệu sản phẩm mới sử dụng Model Product
        const product = ProductModel({
            thumbnail: data.thumbnail,
            slider: data.slider,
            mainText: data.mainText,
            description: data.description,
            category: data.category,
            price: data.price,
            sold: data.sold
        });

        // Lưu sản phẩm vào cơ sở dữ liệu
        await product.save();

        res.status(201).json({
            msg: 'Create product successfully',
            success: true,
        }); // Trả về sản phẩm đã được lưu
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error', success: false })

    }
}

const getProductByID = async (req, res) => {
    try {
        const productID = req.params.productID;

        // Thay vì sử dụng findById({ productID }), bạn nên sử dụng findById(productID)
        const product = await ProductModel.findById(productID);

        if (!product) {
            return res.status(404).json({ // Sử dụng mã trạng thái 404 khi không tìm thấy sản phẩm
                msg: 'Product not found',
                success: false
            });
        }

        return res.status(200).json({
            msg: 'Product found', // Thông báo là sản phẩm được tìm thấy
            success: true,
            data: product
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal Server Error',
            success: false
        });
    }
};

const getFeaturedProducts = async (req, res) => {
    try {
        const topSoldProducts = await ProductModel.find({ sold: { $gt: 0 } })
            .sort({ sold: -1 }) // Sắp xếp dựa trên trường "sold" giảm dần (từ lớn đến nhỏ)
            .limit(10) // Giới hạn số lượng sản phẩm lấy ra

        return res.status(200).json({
            success: true,
            data: topSoldProducts,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal Server Error',
            success: false,
        });
    }
};

const getBOGOProducts = async (req, res) => {
    try {
        // Tìm kiếm trong cơ sở dữ liệu để lấy ra danh sách các sản phẩm
        // có số lượng đã bán từ thấp đến cao
        const products = await ProductModel.find({ sold: { $gt: 0 } })
            .sort({ sold: 1 }) // Sắp xếp dựa trên trường "sold" tăng dần (từ thấp đến cao)
            .limit(10);

        // Trả về danh sách sản phẩm cho client
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }

}


export default {
    uploadImgProduct,
    insertProduct,
    getProductByID,
    getFeaturedProducts,
    getBOGOProducts,
}