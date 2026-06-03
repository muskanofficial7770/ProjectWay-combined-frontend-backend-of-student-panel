const TeacherUpload = require('../models/TeacherUpload');

// Get all uploads
exports.getAllUploads = async (req, res) => {
  console.log('📁 [Teacher Uploads] Get all uploads request received');
  
  try {
    const uploads = await TeacherUpload.find().sort({ uploadDate: -1 });
    console.log('✅ [Teacher Uploads] Retrieved', uploads.length, 'uploads');
    res.json(uploads);
  } catch (error) {
    console.error('❌ [Teacher Uploads] Error fetching uploads:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get upload by ID
exports.getUploadById = async (req, res) => {
  console.log('📁 [Teacher Uploads] Get upload by ID request received');
  console.log('📁 [Teacher Uploads] Upload ID:', req.params.id);
  
  try {
    const upload = await TeacherUpload.findById(req.params.id);
    if (!upload) {
      console.log('⚠️ [Teacher Uploads] Upload not found:', req.params.id);
      return res.status(404).json({ message: 'Upload not found' });
    }
    console.log('✅ [Teacher Uploads] Upload retrieved successfully:', upload.name);
    res.json(upload);
  } catch (error) {
    console.error('❌ [Teacher Uploads] Error fetching upload:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new upload
exports.createUpload = async (req, res) => {
  console.log('📁 [Teacher Uploads] Create upload request received');
  console.log('📁 [Teacher Uploads] Request body:', req.body);
  
  try {
    const upload = new TeacherUpload(req.body);
    const savedUpload = await upload.save();
    console.log('✅ [Teacher Uploads] Upload created successfully:', savedUpload.name);
    res.status(201).json(savedUpload);
  } catch (error) {
    console.error('❌ [Teacher Uploads] Error creating upload:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete upload
exports.deleteUpload = async (req, res) => {
  console.log('📁 [Teacher Uploads] Delete upload request received');
  console.log('📁 [Teacher Uploads] Upload ID:', req.params.id);
  
  try {
    const upload = await TeacherUpload.findByIdAndDelete(req.params.id);
    if (!upload) {
      console.log('⚠️ [Teacher Uploads] Upload not found:', req.params.id);
      return res.status(404).json({ message: 'Upload not found' });
    }
    console.log('✅ [Teacher Uploads] Upload deleted successfully:', upload.name);
    res.json({ message: 'Upload deleted successfully' });
  } catch (error) {
    console.error('❌ [Teacher Uploads] Error deleting upload:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get uploads by teacher
exports.getUploadsByTeacher = async (req, res) => {
  console.log('📁 [Teacher Uploads] Get uploads by teacher request received');
  console.log('📁 [Teacher Uploads] Teacher name:', req.params.teacherName);
  
  try {
    const uploads = await TeacherUpload.find({ uploadedBy: req.params.teacherName }).sort({ uploadDate: -1 });
    console.log('✅ [Teacher Uploads] Retrieved', uploads.length, 'uploads for teacher:', req.params.teacherName);
    res.json(uploads);
  } catch (error) {
    console.error('❌ [Teacher Uploads] Error fetching uploads by teacher:', error);
    res.status(500).json({ message: error.message });
  }
};
