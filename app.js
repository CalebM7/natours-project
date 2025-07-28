const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1) GLOBAL MIDDLEWARES
// Middleware to log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // morgan is a logging middleware that logs HTTP requests
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(`${__dirname}/public`)); // Serve static files from the 'public' directory
app.use('/.well-known', express.static(`${__dirname}/.well-known`));

// Middleware to add a timestamp to each request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);

  next();
});

// 2) ROUTES
// Mount the routers on the app
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 3) ERROR HANDLING
// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling Middleware
app.use(globalErrorHandler);

module.exports = app;
