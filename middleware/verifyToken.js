
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader =
            req.headers.authorization || req.headers.token;

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "Access denied. Token is required."
            });
        }

        // Extract token
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7).trim()
            : authHeader.trim();

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Access denied. Token is empty."
            });
        }

        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            return res.status(500).json({
                status: false,
                message: "JWT secret is not configured."
            });
        }

        // Verify token
        const decoded = jwt.verify(token, secretKey);

        req.user = decoded;
        req.userId = decoded.id;

        next();

    } catch (err) {
        return res.status(401).json({
            status: false,
            message:
                err.name === "TokenExpiredError"
                    ? "Token has expired. Please login again."
                    : "Invalid or expired authentication token."
        });
    }
};

module.exports = { verifyToken };
