const InvestorGrievance = require("../model/InvestorGrievance");
const User = require("../model/User");
const InvestorGrievanceChangelog = require("../model/InvestorGrievanceChangelog");

const createinvestorgrievancelog = async (
  action,
  collectionName,
  itemId,
  performedBy,
  changeDetails
) => {
  const investorglog = new InvestorGrievanceChangelog({
    action,
    collectionName,
    itemId,
    performedBy,
    changeDetails,
  });
  await investorglog.save();
};

const uploadInvestorGrievanceDocument = async (req, res) => {
  try {
    const { name, designation, address, number, email, userId } = req.body;

    const registrarDetails = new InvestorGrievance({
      name,
      designation,
      address,
      number,
      email,
      userId,
    });

    const savedInvestorGrievance = await registrarDetails.save();

    await createinvestorgrievancelog(
      "create",
      "InvestorGrievanceChangelog",
      savedInvestorGrievance._id,
      userId,
      { name, designation, address, number, email ,userId}
    );

    res
      .status(201)
      .json({
        message: "InvestorGrievance submitted successfully",
        data: savedInvestorGrievance,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

const getAllInvestorGrievance = async (req, res) => {
  try {
    const InvestorGrievances = await InvestorGrievance.find();
    res.status(200).json({
      message: "All investor InvestorGrievances retrieved successfully",
      data: InvestorGrievances,
    });
  } catch (error) {
    console.error("Error fetching investor InvestorGrievances:", error);
    res.status(500).json({
      message: "An error occurred while fetching investor InvestorGrievances",
      error,
    });
  }
};

const getAllChangeLogs = async (req, res) => {
  try {
    const changeLogs = await InvestorGrievanceChangelog.find();
    const enrichedLogs = await Promise.all(
      changeLogs.map(async (log) => {
        if (log.performedBy && log.performedBy !== "system") {
          const user = await User.findById(log.performedBy);
          return {
            ...log.toObject(),
            performedByName: user ? user.name : "Unkown User",
          };
        }
        return { ...log.toObject(), performedByName: "System" };
      })
    );
    res.status(200).json({
      message: "Change Logs Fetched successfully",
      data: enrichedLogs,
    });
  } catch (error) {
    console.error("Error fetching change logs", error);
    res.status(500).json({ error: "Failed to fetch change log" });
  }
};

module.exports = {
  uploadInvestorGrievanceDocument,
  getAllChangeLogs,
  getAllInvestorGrievance,
};
