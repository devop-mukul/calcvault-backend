const History = require('../models/History');

// Get user ki history (last 50)
const getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;

    const history = await History.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await History.countDocuments({ userId: req.user._id });

    res.json({
      history,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// New calculation save karo
const saveCalculation = async (req, res) => {
  try {
    const { expression, result } = req.body;

    if (!expression || !result) {
      return res.status(400).json({ error: 'Expression and result required' });
    }

    const calculation = await History.create({
      userId: req.user._id,
      expression,
      result
    });

    res.status(201).json(calculation);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Single history item delete karo
const deleteCalculation = async (req, res) => {
  try {
    const calculation = await History.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!calculation) {
      return res.status(404).json({ error: 'Calculation not found' });
    }

    await calculation.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Poori history clear karo
const clearHistory = async (req, res) => {
  try {
    await History.deleteMany({ userId: req.user._id });
    res.json({ message: 'History cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getHistory,
  saveCalculation,
  deleteCalculation,
  clearHistory
};