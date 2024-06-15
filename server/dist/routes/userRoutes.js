// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// //server>routes> userRoutes.ts
// const express_1 = __importDefault(require("express"));
// const User_1 = __importDefault(require("../models/User"));
// const router = express_1.default.Router();
// router.get('/', async (req, res) => {
//     try {
//         const users = await User_1.default.find({});
//         res.json(users);
//     }
//     catch (error) {
//         res.status(500).send(error);
//     }
// });
// // Add a new user
// router.post('/', async (req, res) => {
//     const user = new User_1.default({
//         firebaseUid: req.body.firebaseUid,
//         name: req.body.name,
//         email: req.body.email,
//         region: req.body.region
//     });
//     try {
//         const newUser = await user.save();
//         res.status(201).json(newUser);
//     }
//     catch (err) {
//         res.status(400).json(err.message);
//     }
// });
// // 사용자 프로필 조회
// router.get('/:firebaseUid', async (req, res) => {
//     const { firebaseUid } = req.params;
//     console.log(`Attempting to find user with UID: ${firebaseUid}`);
//     try {
//         const user = await User_1.default.findOne({ firebaseUid });
//         if (!user) {
//             console.log(`User with UID: ${firebaseUid} not found.`);
//             return res.status(404).json({ message: 'User not found.' });
//         }
//         console.log(`User found: ${user}`);
//         res.json(user);
//     }
//     catch (error) {
//         console.error(`Error fetching user with UID: ${firebaseUid}: ${error}`);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
// // 사용자 프로필 업데이트
// router.post('/:firebaseUid/update', async (req, res) => {
//     const { firebaseUid } = req.params;
//     const { name, email, region } = req.body;
//     console.log(`Update request received for UID: ${firebaseUid}`, req.body);
//     try {
//         const updatedUser = await User_1.default.findOneAndUpdate({ firebaseUid }, { name, email, region }, { new: true, runValidators: true });
//         if (updatedUser) {
//             console.log(`Updated User:`, updatedUser);
//             res.json(updatedUser);
//         }
//         else {
//             console.log(`User not found for UID: ${firebaseUid}`);
//             res.status(404).json({ message: 'User not found.' });
//         }
//     }
//     catch (error) {
//         console.error('Error updating user profile:', error);
//         res.status(500).json({ message: 'Unknown error occurred.', error: error.message });
//     }
// });
// exports.default = router;
