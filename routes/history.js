const express = require('express');
const {
  getHistory,
  saveCalculation,
  deleteCalculation,
  clearHistory
} = require('../controllers/historyController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Sab routes protected hain — login zaroori hai
router.get('/', protect, getHistory);
router.post('/', protect, saveCalculation);
router.delete('/clear', protect, clearHistory);
router.delete('/:id', protect, deleteCalculation);

module.exports = router;