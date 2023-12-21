// routes/userRoutes.js
import express from 'express';
import UserController from '../controllers/userController.js';
import upload from '../middleware/userImage.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Register a new user
router.post('/register', upload.single('profileImage'), UserController.register);

// Login user
router.post('/login', UserController.login);

// Get user profile
router.get('/:userId', UserController.getUserProfile);

// Update user profile
router.put('/:userId', UserController.updateUserProfile);

// Delete user
router.delete('/:userId', UserController.deleteUser);

// Get all users
router.get('/', UserController.getAllUsers);

router.get('/user_seller', UserController.getAllSellers);

router.put('/seller/:id', UserController.updateUser);



router.get('/images/:filename', (req, res) => {
    const { filename } = req.params;
    console.log(filename);
    const imagePath = path.join(__dirname, '../userImages', filename);
  
    res.sendFile(imagePath);
  });

export default router;
