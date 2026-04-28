import { BadRequestError } from "../../shared/errorHandler.js";
import { isValidObjectId } from "mongoose";

const checkValidProductId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return next(new BadRequestError("Invalid Product ID"));
    }
    next();
};

export { checkValidProductId };
