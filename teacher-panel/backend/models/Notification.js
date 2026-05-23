const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  leaderName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Accepted', 'Rejected'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
