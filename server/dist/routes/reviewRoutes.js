// "use strict";
// // src/redux/reducers/reviewReducer.ts
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const express_1 = __importDefault(require("express"));
// const Review_1 = __importDefault(require("../models/Review"));
// const router = express_1.default.Router();
// // Middleware to check if the user is authenticated
// function authenticate(req, res, next) {
//     if (!req.headers.authorization) {
//         res.status(401).send('Authentication required');
//         return;
//     }
//     // Suppose your token is valid
//     next();
// }
// // POST a new review to a specific cafe
// router.post('/:cafeId/reviews', authenticate, async (req, res) => {
//     const { cafeId } = req.params;
//     const { userId, text, rating } = req.body;
//     try {
//         const newReview = new Review_1.default({
//             cafe: cafeId,
//             user: userId,
//             content: text,
//             rating
//         });
//         await newReview.save();
//         res.status(201).json(newReview);
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Failed to post review', error: error.message });
//     }
// });
// // GET all reviews for a specific cafe
// router.get('/:cafeId/reviews', async (req, res) => {
//     const { cafeId } = req.params;
//     try {
//         const reviews = await Review_1.default.find({ cafe: cafeId });
//         res.json(reviews);
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Failed to retrieve reviews', error: error.message });
//     }
// });
// exports.default = router;
