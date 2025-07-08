class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // This indicates that the error is operational and not a programming error

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
