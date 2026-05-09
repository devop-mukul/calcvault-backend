const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expression: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // 90 din baad auto-delete
    expires: 60 * 60 * 24 * 90
  }
});

// userId pe index — fast queries ke liye
historySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('History', historySchema);