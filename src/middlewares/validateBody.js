// src/middlewares/validateBody.js
export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({
        status: 400,
        message: 'Validation error',
        errors: err.details.map((e) => e.message),
        data: null,
      });
    }

    next(err);
  }
};
