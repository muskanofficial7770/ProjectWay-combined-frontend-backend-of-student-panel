import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  ideaId: {
    type: String,
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
    default: 'Feedback Sent'
  },
  teacherName: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
