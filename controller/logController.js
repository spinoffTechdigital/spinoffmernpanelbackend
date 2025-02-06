const Log = require('../model/Log'); 

const logClick = async (req, res) => {
  try {
    const { type, element } = req.body;

    if (!type || !element) {
      return res.status(400).json({ message: 'Type and element are required' });
    }

    const newLog = new Log({
      type,
      element,
      timestamp: new Date(), 
    });

    await newLog.save();
    res.status(201).json({ message: 'Log saved successfully', log: newLog });
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ message: 'Error saving log' });
  }
};

const getTypeCounts = async (req, res) => {
  try {
    const counts = await Log.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);

    res.status(200).json(counts);
  } catch (error) {
    console.error('Error fetching type counts:', error);
    res.status(500).json({ message: 'Error fetching type counts' });
  }
};

const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }); 
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Error fetching logs' });
  }
};

const getHighestVisitedPage = async (req, res) => {
  try {
    const pageCounts = await Log.aggregate([
      {
        $group: {
          _id: '$element',
          count: { $sum: 1 }, 
        },
      },
      { $sort: { count: -1 } },
    ]);

    const mostVisitedPages = pageCounts.slice(0, 5).map((page) => ({
      title: page._id.replace('Navigated to /', ''), 
      count: page.count,
    }));

    res.status(200).json(mostVisitedPages);
  } catch (error) {
    console.error('Error fetching most visited pages:', error);
    res.status(500).json({ message: 'Error fetching most visited pages' });
  }
};


const getVisitCounts = async (req, res) => {
  try {
    const logs = await Log.find();

    const visitCounts = {
      totalCount: logs.length,
      todayVisits: 0,
      thisWeekVisits: 0,
      lastWeekVisits: 0,
      thisMonthVisits: 0,
      thisYearVisits: 0,
      lastYearVisits: 0,
    };

    const now = new Date();

    logs.forEach((log) => {
      const logDate = new Date(log.timestamp);

      if (isToday(logDate)) visitCounts.todayVisits++;
      if (isThisWeek(logDate)) visitCounts.thisWeekVisits++;
      if (isLastWeek(logDate)) visitCounts.lastWeekVisits++;
      if (isThisMonth(logDate)) visitCounts.thisMonthVisits++;
      if (isThisYear(logDate)) visitCounts.thisYearVisits++;
      if (isLastYear(logDate)) visitCounts.lastYearVisits++;
    });

    res.status(200).json(visitCounts);
  } catch (error) {
    console.error('Error fetching visit counts:', error);
    res.status(500).json({ message: 'Error fetching visit counts' });
  }
};

const getRecentLogs = async (req, res) => {
  try {
    const recentLogs = await Log.find()
      .sort({ timestamp: -1 }) 
      .limit(10); 

    res.status(200).json(recentLogs);
  } catch (error) {
    console.error("Error fetching recent logs:", error);
    res.status(500).json({ message: "Error fetching recent logs" });
  }
};

const isToday = (date) => date.toDateString() === new Date().toDateString();

const isThisWeek = (date) => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  return date >= startOfWeek && date < endOfWeek;
};

const isLastWeek = (date) => {
  const now = new Date();
  const startOfLastWeek = new Date(now.setDate(now.getDate() - now.getDay() - 7));
  const endOfLastWeek = new Date(startOfLastWeek);
  endOfLastWeek.setDate(endOfLastWeek.getDate() + 7);
  return date >= startOfLastWeek && date < endOfLastWeek;
};

const isThisMonth = (date) => {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

const isThisYear = (date) => date.getFullYear() === new Date().getFullYear();

const isLastYear = (date) => date.getFullYear() === new Date().getFullYear() - 1;

module.exports = {
  logClick,
  getTypeCounts,
  getAllLogs,
  getVisitCounts,
  getRecentLogs,
  getHighestVisitedPage,
};
