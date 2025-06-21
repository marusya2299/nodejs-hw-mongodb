// src/middlewares/validateBody.js
import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    if (err.isJoi) {
      const error = createHttpError(400, 'Validation error');
      error.details = err.details.map((e) => ({
        message: e.message,
        path: e.path.join('.'),
      }));
      return next(error);
    }
    next(err);
  }
};
