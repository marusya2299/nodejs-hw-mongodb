 // src/middlewares/errorHandler.js
 
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    status,
    message: err.message || "Something went wrong",
    errors: err.errors || null,  // 🔥 додай цю строку!
    data: null,
  });
};
