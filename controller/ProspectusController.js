const path = require('path');
const Prospectus = require('../model/Prospectus');
const User = require('../model/User');
const ProspectusChangelog = require('../model/ProspectusChangelog');

const CreateprospectusChangelog = async (
  action,
  collectionName,
  itemId,
  performedBy,
  changeDetails,
) => {
  const prospectuslog = new ProspectusChangelog({
    action,
    collectionName,
    itemId,
    performedBy,
    changeDetails,
  })
  await prospectuslog.save();
}

const uploadProspectusDocument = async (req, res) => {
    try {
  
      const { title,year, fileUrl ,userId} = req.body;
  
      if (!title || !year || !fileUrl) {
        return res.status(400).json({ success: false, message: 'Please provide a title and file URL.' });
      }
  
      const newProspectusDocument = new Prospectus({
        title,
        year,
        file: fileUrl,
        userId,
      });
  
      const savedProspectusDocument = await newProspectusDocument.save();
     
      await CreateprospectusChangelog(
        'create',
        'ProspectusChangelog',
        savedProspectusDocument._id,
        userId,
        {title,year,fileUrl,userId},
      )
  
      res.status(201).json({
        success: true,
        message: 'File uploaded successfully.',
        data: savedProspectusDocument,
      });
    } catch (error) {
      console.error('Error saving document:', error.message);
      res.status(500).json({ success: false, message: 'Server error during file upload.' });
    }
  };
  
  const getProspectusDocuments = async (req, res) => {
    try {
      const currentYear = new Date().getFullYear();
      const documents = await Prospectus.find();
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
  
  const getAllChangeLogs = async(req,res)=>{
    try {
      const changeLogs = await ProspectusChangelog.find();
  
      const enrichedLogs = await Promise.all(
        changeLogs.map(async (log) => {
          if (log.performedBy && log.performedBy !== "system") {
            const user = await User.findById(log.performedBy);
            return {
              ...log.toObject(),
              performedByName: user ? user.name : "Unknown User",
            };
          }
          return { ...log.toObject(), performedByName: "System" };
        })
      );
  
      res.status(200).json({
        message: "Change logs fetched successfully!",
        data: enrichedLogs,
      });
    } catch (error) {
      console.error("Error fetching change logs:", error);
      res.status(500).json({ error: "Failed to fetch change logs." });
    }
  }
  
  module.exports = {
    uploadProspectusDocument,
    getAllChangeLogs,
    getProspectusDocuments,
  };