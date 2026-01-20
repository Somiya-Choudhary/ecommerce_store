
// Centralized error-handling middleware.
// For this assignment, a single generic error handler is used.
// In a production system, custom error classes (e.g. NotFoundError,
// BadRequestError) could be introduced for finer control.
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: message
  });
};
