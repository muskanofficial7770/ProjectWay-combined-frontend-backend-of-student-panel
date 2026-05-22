const mongoose = require('mongoose');

const studentIssueSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Replied', 'Resolved'],
    default: 'Pending'
  },
  teacherReply: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  repliedAt: {
    type: Date
  }
});

studentIssueSchema.pre('save', function(next) {
  if (this.teacherReply && this.status === 'Pending') {
    this.status = 'Replied';
    this.repliedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('StudentIssue', studentIssueSchema);
