const InvestorGrievance = require('../model/InvestorGrievance');

const uploadInvestorGrievanceDocument = async (req, res) => {
    try {
        const {
            name,designation, address, number, email,
        } = req.body;

        const registrarDetails = new InvestorGrievance({
            name,
            designation,
            address,
            number,
            email,
        });

        const savedInvestorGrievance = await registrarDetails.save();

        res.status(201).json({ message: 'InvestorGrievance submitted successfully', data: savedInvestorGrievance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

const getAllInvestorGrievance = async (req, res) => {
    try {
        const InvestorGrievances = await InvestorGrievance.find();
        res.status(200).json({
            message: 'All investor InvestorGrievances retrieved successfully',
            data: InvestorGrievances,
        });
    } catch (error) {
        console.error('Error fetching investor InvestorGrievances:', error);
        res.status(500).json({
            message: 'An error occurred while fetching investor InvestorGrievances',
            error,
        });
    }
};

module.exports = {
    uploadInvestorGrievanceDocument,
    getAllInvestorGrievance,
};
