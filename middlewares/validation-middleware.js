import StatusCodes from 'http-status-codes';

export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                error: result.error.errors.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }

        req.body = result.data;
        next();
    };
};
