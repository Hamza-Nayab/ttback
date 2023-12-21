// middleware/multerMiddleware.js
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Define your desired upload directory path here
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Validate the file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // Reject the file upload
    cb(new Error('Invalid file type. Only JPEG or PNG files are allowed.'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
