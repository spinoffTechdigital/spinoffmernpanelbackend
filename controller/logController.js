const Log = require("../model/Log");

const logClick = async (req, res) => {
  const { element } = req.body;

  try {
    if (!element) {
      return res.status(400).json({ message: "Element is required" });
    }

    const log = new Log({ type: "navigation", element });
    await log.save();

    res.status(200).json({ message: "Navigation logged successfully" });
  } catch (error) {
    console.error("Error logging navigation:", error.message || error);
    res.status(500).json({ message: "Error logging navigation" });
  }
};

const getTypeCounts = async (req, res) => {
  try {
    const typeCounts = await Log.aggregate([
      {
        $group: {
          _id: "$element",
          count: { $sum: 1 },
        },
      },
    ]);

    const response = typeCounts.map((entry) => ({
      element: entry._id,
      count: entry.count,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching type counts:", error);
    res.status(500).json({ message: "Error fetching type counts" });
  }
};

module.exports = {
  logClick,
  getTypeCounts,
};
