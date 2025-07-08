const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1) MIDDLEWARES
// Middleware to log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // morgan is a logging middleware that logs HTTP requests
}

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(`${__dirname}/public`)); // Serve static files from the 'public' directory
app.use('/.well-known', express.static(`${__dirname}/.well-known`));

// Middleware to add a timestamp to each request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
// Mount the routers on the app
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 3) ERROR HANDLING
// Handle unhandled routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err); // Pass the error to the next middleware

});

// Error handling Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
  err.status = err.status || 'error'; // Default to 'error' if status is not set

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
