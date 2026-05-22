const mongoose = require('mongoose');

const studentProgressSchema = new mongoose.Schema({
  projectName: {
    type: String,
    default: 'Untitled Project'
  },
  leaderName: {
    type: String,
    required: true
  },
  members: [{
    type: String
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  tasks: [{
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending'
    }
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

studentProgressSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('StudentProgress', studentProgressSchema);
