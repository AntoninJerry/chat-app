import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body
    try {

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "please fill all fields",
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "password must be at least 6 characters",
            });
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "user already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });
        } else {
            res.status(400).json({
                message: "user not created",
            });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "user not found",
            }
            );
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "invalid credentials",
            });
        }
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilPic: user.profilPic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
        });
        res.status(200).json({
            message: "logout successful",
        });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilPic } = req.body;
        const userId = req.user._id;

        if (!profilPic) {
            return res.status(400).json({
                message: "please provide a profile picture",
            });
        }

        const response = await cloudinary.uploader.upload(profilPic, {
            folder: "profile-pictures",
            width: 150,
            crop: "scale",
        });
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profilePicture: uploadResponse.secure_url,
            },
            {
                new: true,
            }
        );

        res.status(200).json({
            message: "profile updated",
            user: updatedUser,
        });
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};