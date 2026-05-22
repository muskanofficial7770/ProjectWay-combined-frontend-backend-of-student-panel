const mongoose = require('mongoose');

const teacherFeedbackSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true
  },
  ideaTitle: {
    type: String,
    required: true
  },
  leaderName: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Accepted', 'Rejected', 'Feedback Sent'],
    required: true
  },
  teacherName: {
    type: String,
    default: 'Teacher'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TeacherFeedback', teacherFeedbackSchema);
