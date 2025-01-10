
const multer = require("multer");

// Set the destination for file uploads
const upload = multer({ dest: "uploads/" }); // or define a storage option as per your needs

// Export the upload middleware
module.exports = upload;
