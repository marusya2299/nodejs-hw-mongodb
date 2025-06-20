// src/middlewares/validateBody.js
import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    if (err.isJoi) {
      const error = createHttpError(400, 'Validation error', {
        errors: err.details.map((e) => e.message),
      });
      next(error);
    } else {
      next(err);
    }
  }
};
