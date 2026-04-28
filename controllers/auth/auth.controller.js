import { User } from "../../shared/models/user.model.js";
import { SuccessResponse } from "../../shared/responseProcessor.js";
import { BadRequestError } from "../../shared/errorHandler.js";
import { createToken } from "../../shared/utils/jwt.js";
import { setCookie } from "../../shared/utils/cookie.js";
import { compare } from "bcryptjs";

const signupController = async (req, res) => {
    const data = req.data;
    const createUser = await User.create(data);
    const userObj = createUser.toObject();
    delete userObj.password;
    const token = createToken({ id: createUser._id });
    setCookie(res, "token", token);
    return new SuccessResponse({ user: userObj, token }, 201, "User Created and Logged In Successfully!");
};

const loginController = async (req, res) => {
    const { userName, password } = req.data;
    const findUser = await User.findOne({ userName }).select("+password");
    if (!findUser) throw new BadRequestError("Invalid Credentials");
    const match = await compare(password, findUser.password);
    if (!match) throw new BadRequestError("Invalid Credentials");
    const token = createToken({ id: findUser._id });
    setCookie(res, "token", token);
    return new SuccessResponse({ token }, 200, "Login successful!");
};

export { signupController, loginController };