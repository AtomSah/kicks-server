const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters long" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const userData = {
            username,
            email,
            password: hashedPass,

        };

        const newUser = new User(userData);
        const data = await newUser.save();

        res.status(201).json({ message: "User saved successfully", data });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (isMatch) {
            const token = jwt.sign(
                {
                    id: existingUser._id,
                    email: existingUser.email,
                    role: existingUser.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: "3d" }
            );

            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: existingUser._id,
                    role: existingUser.role,
                    token,
                },
            });
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error });
    }
}


module.exports = {
    register,
    login,
};