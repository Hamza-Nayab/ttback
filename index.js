
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = 3000;
app.use(cors());
// Connect to MongoDB
const url =
  "mongodb+srv://hamaz:hamza123@cluster0.sgog47j.mongodb.net/Thread?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Middleware
app.use(express.json());
// Add other middleware as needed

app.use('/api/users', userRoutes);
app.use('/api', reviewRoutes);
app.use('/api/images', reviewRoutes);



// Routes
// Import and use your defined routes here
// Example: app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
