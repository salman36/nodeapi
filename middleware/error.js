import ErrorHandler from "../utils/ErrorHandler.js";

export const middleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internet Server Error";

  /// mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
