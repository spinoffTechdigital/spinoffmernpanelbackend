const multer = require('multer');
const path = require('path');

// Define the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to the 'uploads' directory
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique file name based on the current date and original filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to restrict file types (e.g., only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true); // File type is valid
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif).'), false);
  }
};

// Set up multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for file size
  fileFilter: fileFilter,
});

module.exports = upload;
