const multer = require('multer');
const path = require('path');
const FinancialDocument = require('../model/FinancialDocument');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

const uploadFinancialDocument = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res.status(400).json({ success: false, message: 'Please provide a title and file.' });
    }

    const newDocument = new FinancialDocument({
      title,
      file: file.filename, 
    });

    await newDocument.save();

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully.',
      data: newDocument,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during file upload.' });
  }
};

const getFinancialDocuments = async (req, res) => {
    try {
      const documents = await FinancialDocument.find();
      res.status(200).json({ success: true, data: documents });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching documents.' });
    }
  };

module.exports = {
  uploadFinancialDocument,
  getFinancialDocuments,
  upload,
};
