import express from 'express'; // If you're using TypeScript, ensure your setup allows for ES Modules
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

require('dotenv').config(); // If you're using JavaScript

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // This is to parse JSON bodies. This negates the need for body-parser.

if (!process.env.MONGO_DB_URI) {
  throw new Error("MONGO_DB_URI is not defined");
}
mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
// Define routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));