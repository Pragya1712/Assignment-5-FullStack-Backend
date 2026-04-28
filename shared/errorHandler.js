import { StatusCodes } from "http-status-codes";

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = "Api Error";
    }
}

class BadRequestError extends ApiError {
    constructor(message) {
        super(StatusCodes.BAD_REQUEST, message);
        this.name = "Bad Request Error";
    }
}

class PageNotFoundError extends ApiError {
    constructor(message) {
        super(StatusCodes.NOT_FOUND, message);
        this.name = "Page not found";
    }
}

class AuthorizationError extends ApiError {
    constructor(message = "Authorization Error") {
        super(StatusCodes.UNAUTHORIZED, message);
        this.name = "Unauthorized Error";
    }
}


const errorHandler = (error, req, res, next) => {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).send({
            data: { error: error.name },
            statusCode: error.statusCode,
            message: error.message
        });
    }
    return res.status(500).send({
        data: {},
        statusCode: 500,
        message: error.message
    });
}
export {
    ApiError,
    AuthorizationError,
    BadRequestError,
    PageNotFoundError,
    errorHandler
}