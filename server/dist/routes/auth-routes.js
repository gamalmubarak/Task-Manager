import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            res.status(400).json({ message: "Invalid username or password" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid username or password" });
            return;
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: "30m" });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
