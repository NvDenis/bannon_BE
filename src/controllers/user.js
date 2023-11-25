import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { capitalizeEachWord, createAccessToken, createRefreshToken } from '../utils/createToken.js'

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check for existence
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password cannot be empty." });
        }

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        if (!emailRegex.test(email)) {
            // Nếu email không phù hợp với định dạng, trả về lỗi
            return res.status(400).json({ message: 'Email không hợp lệ' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist." });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }


        // Tạo Access Token và Refresh Token
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        // đặt refreshToken vào thiết bị client
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian sống của Refresh Token (7 ngày)
        });

        // Lưu vào database
        user.refreshToken = refreshToken;
        await user.save();

        const responseData = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            wishList: user.wishList
        };

        // Return the token to the user
        return res.status(200).json({
            "statusCode": 201,
            "message": "",
            "data": {
                "access_token": accessToken,
                "user": responseData
            },
            author: "DuyNguyenIT"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
}

const register = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        // Check if any of the required fields are null
        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ message: "Vui lòng nhập tất cả thông tin!" });
        }

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        if (!emailRegex.test(email)) {
            // Nếu email không phù hợp với định dạng, trả về lỗi
            return res.status(400).json({ message: 'Email không hợp lệ' });
        }

        // Check if the user already exists by email
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ "statusCode": 400, message: "User already exists.", "error": "Bad Request" });
        }

        // Hash the user's password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            fullName: capitalizeEachWord(fullName),
            email,
            phone,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({
            statusCode: 201,
            msg: "Registration successful",
            data: {
                _id: newUser._id, // You can use the actual _id generated by MongoDB
                email: newUser.email,
                fullName: newUser.fullName
            },
            author: "DuyNguyenIT"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Server error", });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refresh_token = req?.cookies?.refreshToken;

        if (!refresh_token) {
            return res.status(401).json({ msg: `You're not authenticated`, success: false });
        }

        const user = await User.findOne({ refreshToken: refresh_token });

        if (!user) {
            return res.status(401).json({ msg: 'Invalid Refresh Token', success: false });
        }

        const { password, refreshToken, __v, ...others } = user._doc;

        const access_token = createAccessToken(others);


        return res.status(200).json({
            "statusCode": 201,
            "message": "",
            "data": {
                "access_token": access_token,
                "user": others
            },
            author: "DuyNguyenIT"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error', success: false });
    }
}

const logout = async (req, res) => {
    try {
        const refresh_token = req?.cookies?.refreshToken;

        if (!refresh_token) {
            return res.status(401).json({
                msg: "You're are not authenticated",
            })
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        })

        const user = await User.findOne({ refreshToken: refresh_token })
        if (user) {
            user.refreshToken = "";
            await user.save();
        }

        return res.status(200).json({ msg: 'Logout successful', success: true });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error', success: false });
    }
}

const fetchAccount = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.userData.userId
        })

        if (!user) {
            return res.status(401).json({
                msg: "User does not exist"
            })
        }

        return res.status(200).json({
            "statusCode": 200,
            "message": "Fetch account successfully",
            "data": {
                "user": {
                    "id": user._id,
                    "email": user.email,
                    "phone": user.phone,
                    "fullName": user.fullName,
                    "role": user.role,
                    // "avatar": "duy-b4cf4bd2fdcfdac2ef63250c8d9b63bf.jpg"
                    wishList: user.wishList,
                }
            },
            "author": "DuyNguyenIT"
        })



    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error', success: false });
    }
}


export default {
    login,
    register,
    refreshToken,
    logout,
    fetchAccount,
}