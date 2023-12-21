import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  title: String,
  description: String,
  seller:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
   },
  rating: Number,
  images: [String],
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Review = mongoose.model('Review', reviewSchema);

 export default Review;
