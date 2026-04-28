export const paginationMiddleware = (model) => {
    return async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;
            const total = await model.countDocuments();
            const data = await model.find().skip(skip).limit(limit);
            const paginatedResult = {
                data: data,
                totalCount: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit)
            }
            if (skip + limit < total) {
                paginatedResult.nextPage = page + 1;
            }
            if (page > 1) {
                paginatedResult.prevPage = page - 1;
            }
            req.result = paginatedResult;
            next()
        } catch (error) {
            next(error);
        }
    }
}
