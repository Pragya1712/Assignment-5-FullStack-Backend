import { verifyToken } from "../utils/jwt.js";
import { getCookie } from "../../shared/utils/cookie.js";
import { User } from "../../shared/models/user.model.js";
import { AuthorizationError } from "../../shared/errorHandler.js";

export const checkAuth = async (req, res, next) => {
    try {
        const token = getCookie(req, "token");
        console.log("token:", token);
        if (!token) return next(new AuthorizationError("Please login!!"));
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (!user) return next(new AuthorizationError("User not exists."));
        req.user = user;
        next();
    } catch (error) {
        next(new AuthorizationError("Invalid or expired token."));
    }
};

export const isAdmin = () => {
    return (req, res, next) => {
        if (req.user.role !== "admin") {
            return next(new AuthorizationError(`Role '${req.user.role}' is not allowed to access products.`));
        }
        next();
    };
};