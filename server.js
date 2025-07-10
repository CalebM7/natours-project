const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); // Exit the process with failure
});

dotenv.config({ path: './config.env' }); // Load environment variables from config.env file
const app = require('./app'); // Import the main app module

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

console.log('Connecting with URL:', DB);
// Connect to MongoDB
mongoose.connect(DB).then(() => console.log('DB connection successful! 🎉'));

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION 💥 Shutting down...');
  server.close(() => {
    process.exit(1); // Exit the process with failure
  });
});


