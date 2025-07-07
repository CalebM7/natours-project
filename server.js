const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Load environment variables from config.env file
const app = require('./app'); // Import the main app module

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

console.log('Connecting with URL:', DB);
// Connect to MongoDB
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful! 🎉'));


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
