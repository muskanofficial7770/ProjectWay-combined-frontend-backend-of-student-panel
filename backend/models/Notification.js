import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  ideaId: {
    type: String,
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
  read: {
    type: Boolean,
    default: false
  },
  submittedAt: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['idea_submission', 'feedback', 'task_assignment'],
    default: 'idea_submission'
  }
}, {
  timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
