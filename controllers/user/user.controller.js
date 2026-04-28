import { User } from "../../shared/models/user.model.js"
import { SuccessResponse } from "../../shared/responseProcessor.js";
import { BadRequestError } from "../../shared/errorHandler.js";
import { StatusCodes } from "http-status-codes";

const getUsersController = async (req, res) => {
    return new SuccessResponse(req.result, StatusCodes.OK, "Users fetched successfully");
};

const getUserByIdController = async (req, res) => {
    const { id } = req.params;
    const findUser = await User.findById(id);
    if (!findUser) throw new BadRequestError("User not found!");
    return new SuccessResponse(findUser, StatusCodes.OK, "User fetched successfully");
};

const createUserController = async (req, res) => {
    const { userName, displayName, password, role } = req.body;
    const createUser = await User.create({ userName, displayName, password, role });
    const newUser = createUser.toObject();
    delete newUser.password;
    return new SuccessResponse(newUser, StatusCodes.CREATED, "User Created Successfully!");
};

const updateUserController = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedUser) throw new BadRequestError("User not found!");
    return new SuccessResponse(updatedUser, StatusCodes.OK, "User updated successfully");
};

const patchUserController = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );
    if (!updatedUser) throw new BadRequestError("User not found!");
    return new SuccessResponse(updatedUser, StatusCodes.OK, "User updated successfully");
};

const deleteUserController = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new BadRequestError("User not found!");
    return new SuccessResponse(null, StatusCodes.OK, "User deleted successfully");
};

export {
    getUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    patchUserController,
    deleteUserController
};