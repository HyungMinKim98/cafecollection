import express from 'express'; // If you're using TypeScript, ensure your setup allows for ES Modules
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import reviewRoutes from './routes/reviewRoutes';
import userRoutes from './routes/userRoutes';
import cafeRoutes from './routes/cafeRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerDefinition } from './swaggerDefinition';
import Cafe from './models/Cafe';

require('dotenv').config(); // If you're using JavaScript


const app = express();
const PORT = process.env.PORT || 5001;
const options = {
  swaggerDefinition,
  // TypeScript에서는 routes 경로를 정확히 지정해야 합니다.
  apis: ['./routes/**/*.ts'],
};
const swaggerSpec = swaggerJsdoc(options);

// Middleware
app.use(cors());
app.use(express.json()); // This is to parse JSON bodies. This negates the need for body-parser.

app.use('/api', cafeRoutes);
app.use('/api', reviewRoutes);
app.use('/api', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/cafes', async (req, res) => {
  const cafes = await Cafe.find();
  res.json(cafes);
});

app.post('/cafes', async (req, res) => {
  const cafe = new Cafe(req.body);
  await cafe.save();
  res.status(201).json(cafe);
});

app.get('/cafes/:id', async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    if (!cafe) {
      return res.status(404).send('Cafe not found');
    }
    res.json(cafe);
  } catch (err) {
    // Assert err is of type any to access its properties
    res.status(500).send((err as any).message);
  }
});

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