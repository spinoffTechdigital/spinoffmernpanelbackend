const path = require('path');
const rhp= require('../model/Rhp');

const uploadrhpDocument = async (req, res) => {
    try {
      console.log('Incoming request body:', req.body); 
  
      const { title,year, fileUrl } = req.body;
  
      if (!title || !year || !fileUrl) {
        return res.status(400).json({ success: false, message: 'Please provide a title and file URL.' });
      }
  
      const newrhpDocument = new rhp({
        title,
        year,
        file: fileUrl,
      });
  
      const savedrhpDocument = await newrhpDocument.save();
      console.log('Saved document:', savedrhpDocument); 
  
      res.status(201).json({
        success: true,
        message: 'File uploaded successfully.',
        data: savedrhpDocument,
      });
    } catch (error) {
      console.error('Error saving document:', error.message);
      res.status(500).json({ success: false, message: 'Server error during file upload.' });
    }
  };
  
  
  const getrhpDocuments = async (req, res) => {
    try {
      const currentYear = new Date().getFullYear();
      const documents = await rhp.find();
      const currentDocuments = documents.filter(doc => doc.year >= currentYear - 5);
      const archivedDocuments = documents.filter(doc => doc.year < currentYear - 5);
      currentDocuments.sort((a, b) => b.year - a.year);
      archivedDocuments.sort((a, b) => b.year - a.year);
      res.status(200).json({
        success: true,
        data: {
          current: currentDocuments, 
          archived: archivedDocuments,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching documents.' });
    }
  };
  
  
  module.exports = {
    uploadrhpDocument,
    getrhpDocuments,
  };