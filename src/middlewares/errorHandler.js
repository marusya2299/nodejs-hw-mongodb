 // src/middlewares/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
       status: 500,
		message: "Something went wrong",
		data: err.message || "Unknown error",
  });
};