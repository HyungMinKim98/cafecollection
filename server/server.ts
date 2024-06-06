// server> server.ts
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
import multer from 'multer';
import User from './models/User'; // 수정된 임포트 경로



// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists or create it
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

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
app.use('/api/reviews', reviewRoutes);  // 추가된 부분
app.use('/api/users', userRoutes);
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

// Upload route
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // The file is now saved in the uploads directory.
  // Send back the file path as response, or store the path in the database.
  res.status(201).json({
    message: 'File uploaded successfully',
    filePath: req.file.path
  });
});
// 특정 ID를 가진 카페 데이터 삭제
app.delete('/cafes/:id', async (req, res) => {
  try {
    const result = await Cafe.findByIdAndDelete(req.params.id);
    if (result) {
      res.send({ message: 'Cafe deleted successfully.' });
    } else {
      res.status(404).send({ message: 'Cafe not found.' });
    }
  } catch (error) {
    res.status(500).send({ message: (error as any).message });
  }
});


// Make the 'uploads' directory publicly accessible
app.use('/uploads', express.static('uploads'));

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

// 사용자 프로필 조회
app.get('/api/users/:firebaseUid', async (req, res) => {
  console.log("Received request for UID:", req.params.firebaseUid);
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    console.log("Received request for UID:", req.params.firebaseUid);
    if (user) {
      res.json(user);
      console.log("Received request for UID:", req.params.firebaseUid);
    } else {
      res.status(404).json({ message: 'User not found.' });
      console.log("Received request for UID:", req.params.firebaseUid);

    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));