const DetailsofRegistrar = require('../model/DetailsofRegistrar');
const User = require('../model/User');
const DetailsofRegistrarChangeLog = require('../model/DetailsofRegistrarChangeLog');

const detailsofRegistrarChangeLog = async(
    action,
    collectionName,
    itemId,
    performedBy,
    changeDetails
) =>{
    const detailsofRegistrarLog = new DetailsofRegistrarChangeLog({
        action,
        collectionName,
        itemId,
        performedBy,
        changeDetails,
    })
    await detailsofRegistrarLog.save();
}


const uploadDetailsofRegistrarDocument = async (req, res) => {
    try {
        const {
            name, address, telNo, tollFreeNo, emailId,
            DetailsofRegistrarEmailId, contactPerson, website, sebiRegistrationNo,userId
        } = req.body;

        const registrarDetails = new DetailsofRegistrar({
            name,
            address,
            telNo,
            tollFreeNo,
            emailId,
            DetailsofRegistrarEmailId,
            contactPerson,
            website,
            sebiRegistrationNo,
            userId,
        });

        const savedDetailsofRegistrar = await registrarDetails.save();

        await detailsofRegistrarChangeLog(
            "create",
            "DetailsofRegistrarChangeLog",
            savedDetailsofRegistrar._id,
            userId,
            {name,address,telNo,tollFreeNo,emailId,DetailsofRegistrarEmailId,contactPerson,website,sebiRegistrationNo,userId}
        )

        res.status(201).json({ message: 'DetailsofRegistrar submitted successfully', data: savedDetailsofRegistrar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

const getAllDetailsofRegistrar = async (req, res) => {
    try {
        const DetailsofRegistrars = await DetailsofRegistrar.find();
        res.status(200).json({
            message: 'All investor DetailsofRegistrars retrieved successfully',
            data: DetailsofRegistrars,
        });
    } catch (error) {
        console.error('Error fetching investor DetailsofRegistrars:', error);
        res.status(500).json({
            message: 'An error occurred while fetching investor DetailsofRegistrars',
            error,
        });
    }
};

const getAllChangeLogs = async(req,res)=>{
    try {
      const changeLogs = await DetailsofRegistrarChangeLog.find();
  
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
    uploadDetailsofRegistrarDocument,
    getAllChangeLogs,
    getAllDetailsofRegistrar,
};
