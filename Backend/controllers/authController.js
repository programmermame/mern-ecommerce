import User from "../models/User.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        user = await User.create({ name, email, password });

        const token = user.getSignedJwtToken();

        return res.status(201).json({ success: true, token, user });

    } catch (error) {
        res.status(500).json({ message: error })
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const token = user.getSignedJwtToken();

        res.json({ success: true, token, user })
    } catch (error) {
        res.status(500).json({ message: error });
    }

};

export { registerUser, loginUser };