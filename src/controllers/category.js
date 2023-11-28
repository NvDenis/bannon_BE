import CategoryModel from '../models/category.js'
import ProductModel from '../models/product.js'

const categoryMappings = {
    'non-da': 'nón da',
    'non-snapback': 'nón snapback',
    'non-ket': 'nón kết',
    'non-jacket': 'nón jacket',
    'non-dan-tay': 'nón đan tay',
    'non-vanh': 'nón vành',
    'non-phot': 'nón phớt',
    'non-bao-hiem': 'nón bảo hiểm',
    'non-tre-em': 'nón trẻ em',
    // Thêm ánh xạ cho các giá trị khác nếu cần
};

const getCategories = async (req, res) => {
    try {

        const category = await CategoryModel.find({});


        res.status(200).json({
            msg: 'Get categories successfully',
            success: true,
            data: category
        })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error', success: false })
    }
}

const getCategoryByID = async (req, res) => {
    try {
        const categoryID  = req?.params?.categoryID;

        const products = await ProductModel.find({ category: categoryID })

        res.status(200).json({
            msg: "",
            success: true,
            data: {
                products,
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error', success: false })
    }
}

const getCategoryByName = async (req, res) => {
    try {


        const frontendCategoryName = req?.params?.categoryName;

        // Sử dụng danh sách ánh xạ để chuyển đổi tên loại sản phẩm
        const categoryName = categoryMappings[frontendCategoryName];

        const categoryID = await CategoryModel.find({ name: categoryName })

        const products = await ProductModel.find({ category: categoryID })

        const category = await CategoryModel.findById(categoryID);


        res.status(200).json({
            msg: "",
            success: true,
            data: {
                title: categoryName,
                products,
                banner: category.banner
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error', success: false })

    }
}


const insertCategories = async (req, res) => {
    try {
        const { name, thumb, banner } = req.body;

        const newCategory = CategoryModel({
            name,
            thumb,
            banner
        })

        await newCategory.save();

        return res.json({
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error', success: false })

    }

}



export default {
    getCategories,
    getCategoryByName,
    insertCategories,
    getCategoryByID
}