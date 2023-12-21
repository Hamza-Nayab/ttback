import Review from '../models/Review.js'; 
import  User from '../models/User.js'; 


 const reviewController =
{

 
 createReview : async (req, res) => {
  try {
    const { title, description,sellerId, rating,userId  } = req.body;
    const images = req.files.map((file) => file.path); 

    console.log("Info..",req.body);

    const user = await User.findById(userId);
    console.log("User : ",user);
    const newReview = new Review({
      title,
      description,
      seller:sellerId,
      rating,
      images,
      user: user._id
    });

    await newReview.save();

    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} ,

   fetchReviews : async (req, res) => {
    console.log("Reviews For Fetching ...");
    try {
      const reviews = await Review.find(); 
      res.status(200).json({ reviews });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
   getReviewById : async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.findById(id); 
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.status(200).json({ review });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
   updateReview : async (req, res) => {
    const { id } = req.params;
    try {

      const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.status(200).json({ updatedReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
   deleteReview : async (req, res) => {
    const { id } = req.params;
    try {
      const deletedReview = await Review.findByIdAndDelete(id); 
      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getRecentReviews: async (req, res) => {
    try {
      const recentReview = await Review.find().sort({ createdAt: -1 }).limit(1);

      if (recentReview.length === 0) {
        return res.status(404).json({ message: 'No recent reviews found' });
      }

      res.status(200).json({ review: recentReview[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
}
  export default reviewController;