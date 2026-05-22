const TeacherUpload = require('../models/TeacherUpload');

// Get all uploads
exports.getAllUploads = async (req, res) => {
  try {
    const uploads = await TeacherUpload.find().sort({ uploadDate: -1 });
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get upload by ID
exports.getUploadById = async (req, res) => {
  try {
    const upload = await TeacherUpload.findById(req.params.id);
    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }
    res.json(upload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new upload
exports.createUpload = async (req, res) => {
  try {
    const upload = new TeacherUpload(req.body);
    const savedUpload = await upload.save();
    res.status(201).json(savedUpload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete upload
exports.deleteUpload = async (req, res) => {
  try {
    const upload = await TeacherUpload.findByIdAndDelete(req.params.id);
    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }
    res.json({ message: 'Upload deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get uploads by teacher
exports.getUploadsByTeacher = async (req, res) => {
  try {
    const uploads = await TeacherUpload.find({ uploadedBy: req.params.teacherName }).sort({ uploadDate: -1 });
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
