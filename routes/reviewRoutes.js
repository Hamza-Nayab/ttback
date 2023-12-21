import express from 'express';
import reviewController from '../controllers/reviewController.js';
import upload from '../middleware/multerMiddleware.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Create a new review with image upload
router.post('/reviews', upload.array('images', 5), reviewController.createReview);

// Fetch all reviews
router.get('/reviews', reviewController.fetchReviews);

// Fetch a single review by ID
router.get('/reviews/:id', reviewController.getReviewById);

// Update a review by ID
router.put('/reviews/:id', reviewController.updateReview);

// Delete a review by ID
router.delete('/reviews/:id', reviewController.deleteReview);

router.get('/reviews/recent', reviewController.getRecentReviews);

router.get('/images/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../uploads', filename);

  res.sendFile(imagePath);
});

export default router;
