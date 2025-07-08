module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
  err.status = err.status || 'error'; // Default to 'error' if status is not set

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}