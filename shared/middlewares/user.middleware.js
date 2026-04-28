import { BadRequestError } from "../../shared/errorHandler.js";
import { isValidObjectId } from "mongoose";

export const checkValidUserId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return next(new BadRequestError("Invalid User ID"));
    }
    next();
};