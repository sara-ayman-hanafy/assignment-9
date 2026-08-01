import { verifyToken } from "../utils/token.js";

export const auth = (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                message: "Token required",
            });
        }

        const decoded = verifyToken(token);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};