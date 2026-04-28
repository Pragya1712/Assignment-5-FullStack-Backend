import { StatusCodes } from 'http-status-codes';

const responseProcessor = (handlerFunction) => {
    return async (req, res, next) => {
        Promise.resolve(handlerFunction(req, res, next)).then((response) => {
            if (response instanceof SuccessResponse) {
                return res.status(response.statusCode).send({
                    data: response.data,
                    message: response.message,
                    statusCode: response.statusCode
                });
            }
            return res.status(StatusCodes.OK).send({
                data: response,
                statusCode: StatusCodes.OK,
                message: "Request processed successfully"
            })
        }).catch((error) => {
            next(error);
        })
    }
}

class SuccessResponse {
    constructor(data, statusCode = StatusCodes.OK, message = "Request processed successfully") {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
    }
}

export { responseProcessor, SuccessResponse };