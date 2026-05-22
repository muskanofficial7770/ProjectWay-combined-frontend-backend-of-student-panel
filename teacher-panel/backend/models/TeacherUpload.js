const mongoose = require('mongoose');

const teacherUploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  announcement: {
    type: String,
    default: 'No announcement'
  },
  uploadedBy: {
    type: String,
    default: 'Teacher'
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  data: {
    type: String // Base64 encoded file data
  }
});

module.exports = mongoose.model('TeacherUpload', teacherUploadSchema);
