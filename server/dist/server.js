// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// // server> server.ts
// const express_1 = __importDefault(require("express")); // If you're using TypeScript, ensure your setup allows for ES Modules
// const mongoose_1 = __importDefault(require("mongoose"));
// const cors_1 = __importDefault(require("cors"));
// require("dotenv/config");
// const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
// const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// const cafeRoutes_1 = __importDefault(require("./routes/cafeRoutes"));
// const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// const swaggerDefinition_1 = require("./swaggerDefinition");
// const Cafe_1 = __importDefault(require("./models/Cafe"));
// const multer_1 = __importDefault(require("multer"));
// const User_1 = __importDefault(require("./models/User")); // 수정된 임포트 경로
// // Set up multer for file storage
// const storage = multer_1.default.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Make sure this directory exists or create it
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = (0, multer_1.default)({ storage: storage });
// const app = (0, express_1.default)();
// const PORT = process.env.PORT || 5001;
// const options = {
//     swaggerDefinition: swaggerDefinition_1.swaggerDefinition,
//     // TypeScript에서는 routes 경로를 정확히 지정해야 합니다.
//     apis: ['./routes/**/*.ts'],
// };
// const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
// // Middleware
// app.use((0, cors_1.default)());
// app.use(express_1.default.json()); // This is to parse JSON bodies. This negates the need for body-parser.
// app.use('/api', cafeRoutes_1.default);
// app.use('/api/reviews', reviewRoutes_1.default);
// app.use('/api/users', userRoutes_1.default);
// app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// app.get('/cafes', async (req, res) => {
//     const cafes = await Cafe_1.default.find();
//     res.json(cafes);
// });
// app.post('/cafes', async (req, res) => {
//     const cafe = new Cafe_1.default(req.body);
//     await cafe.save();
//     res.status(201).json(cafe);
// });
// app.get('/cafes/:id', async (req, res) => {
//     try {
//         const cafe = await Cafe_1.default.findById(req.params.id);
//         if (!cafe) {
//             return res.status(404).send('Cafe not found');
//         }
//         res.json(cafe);
//     }
//     catch (err) {
//         // Assert err is of type any to access its properties
//         res.status(500).send(err.message);
//     }
// });
// // Upload route
// app.post('/upload', upload.single('image'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     // The file is now saved in the uploads directory.
//     // Send back the file path as response, or store the path in the database.
//     res.status(201).json({
//         message: 'File uploaded successfully',
//         filePath: req.file.path
//     });
// });
// // 특정 ID를 가진 카페 데이터 삭제
// app.delete('/cafes/:id', async (req, res) => {
//     try {
//         const result = await Cafe_1.default.findByIdAndDelete(req.params.id);
//         if (result) {
//             res.send({ message: 'Cafe deleted successfully.' });
//         }
//         else {
//             res.status(404).send({ message: 'Cafe not found.' });
//         }
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });
// // Make the 'uploads' directory publicly accessible
// app.use('/uploads', express_1.default.static('uploads'));
// if (!process.env.MONGO_DB_URI) {
//     throw new Error("MONGO_DB_URI is not defined");
// }
// mongoose_1.default.connect(process.env.MONGO_DB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB', err));
// // Define routes
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });
// // 사용자 프로필 조회
// app.get('/api/users/:firebaseUid', async (req, res) => {
//     console.log("Received request for UID:", req.params.firebaseUid);
//     try {
//         const user = await User_1.default.findOne({ firebaseUid: req.params.firebaseUid });
//         console.log("Received request for UID:", req.params.firebaseUid);
//         if (user) {
//             res.json(user);
//             console.log("Received request for UID:", req.params.firebaseUid);
//         }
//         else {
//             res.status(404).json({ message: 'User not found.' });
//             console.log("Received request for UID:", req.params.firebaseUid);
//         }
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Server error.' });
//     }
// });
// // Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
