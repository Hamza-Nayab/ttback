
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  phone: String,
  location:String,
  description: String,
  
  
});

const Review = mongoose.model('Review', reviewSchema);

 export default Review;
