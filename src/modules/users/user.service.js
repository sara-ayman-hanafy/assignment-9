import { User } from "../../db/models/user/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/token.js";
import { encrypt } from "../../utils/encryption.js";

export const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            age,
        } = req.body;

        const exist = await User.findOne({
            email,
        });

        if (exist) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        const hashedPassword =
            bcrypt.hashSync(password, 8);

        const encryptedPhone =
            encrypt(phone);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone: encryptedPhone,
            age,
        });

        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } =
            req.body;

        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password",
            });
        }

        const match =
            bcrypt.compareSync(
                password,
                user.password
            );

        if (!match) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = generateToken({
            userId: user._id,
        });

        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUser = async (
    req,
    res
) => {
    try {
        const user = await User.findById(
            req.userId
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateUser = async (
    req,
    res
) => {
    try {
        if (req.body.email) {
            const emailExist =
                await User.findOne({
                    email: req.body.email,
                });

            if (
                emailExist &&
                emailExist._id.toString() !==
                req.userId
            ) {
                return res.status(409).json({
                    message: "Email already exists",
                });
            }
        }

        delete req.body.password;

        const user =
            await User.findByIdAndUpdate(
                req.userId,
                req.body,
                {
                    new: true,
                }
            );

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteUser = async (
    req,
    res
) => {
    try {
        const user =
            await User.findByIdAndDelete(
                req.userId
            );

        res.status(200).json({
            message:
                "User deleted successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};