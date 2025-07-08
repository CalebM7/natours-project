const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// Middleware to log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // morgan is a logging middleware that logs HTTP requests
}

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(`${__dirname}/public`)); // Serve static files from the 'public' directory
app.use('/.well-known', express.static(`${__dirname}/.well-known`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mount the routers on the app
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  // next(); // No need to call next() here since we are sending a response
});

module.exports = app;
