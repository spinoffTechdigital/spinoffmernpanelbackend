const DetailsofRegistrar = require('../model/DetailsofRegistrar');

const uploadDetailsofRegistrarDocument = async (req, res) => {
    try {
        const {
            name, address, telNo, tollFreeNo, emailId,
            DetailsofRegistrarEmailId, contactPerson, website, sebiRegistrationNo
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
            sebiRegistrationNo
        });

        const savedDetailsofRegistrar = await registrarDetails.save();

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

module.exports = {
    uploadDetailsofRegistrarDocument,
    getAllDetailsofRegistrar,
};
