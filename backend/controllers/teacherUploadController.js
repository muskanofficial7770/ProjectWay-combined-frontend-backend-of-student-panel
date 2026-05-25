import TeacherUpload from '../models/TeacherUpload.js';

// Upload a new file (for teacher)
export const uploadFile = async (req, res) => {
  try {
    const { name, type, size, url, announcement, teacherName } = req.body;

    const newUpload = new TeacherUpload({
      id: Date.now().toString(),
      name,
      type,
      size,
      url,
      announcement: announcement || 'No announcement',
      teacherName
    });

    const savedUpload = await newUpload.save();

    res.status(201).json({ 
      success: true, 
      message: 'File uploaded successfully!',
      upload: savedUpload 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading file', 
      error: error.message 
    });
  }
};

// Get all teacher uploads
export const getAllUploads = async (req, res) => {
  try {
    const uploads = await TeacherUpload.find().sort({ uploadDate: -1 });
    res.status(200).json({ success: true, uploads });
  } catch (error) {
    console.error('Error fetching uploads:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching uploads', 
      error: error.message 
    });
  }
};

// Get upload by ID
export const getUploadById = async (req, res) => {
  try {
    const { id } = req.params;
    const upload = await TeacherUpload.findOne({ id });

    if (!upload) {
      return res.status(404).json({ 
        success: false, 
        message: 'Upload not found' 
      });
    }

    res.status(200).json({ success: true, upload });
  } catch (error) {
    console.error('Error fetching upload:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching upload', 
      error: error.message 
    });
  }
};

// Delete upload (for teacher)
export const deleteUpload = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUpload = await TeacherUpload.findOneAndDelete({ id });

    if (!deletedUpload) {
      return res.status(404).json({ 
        success: false, 
        message: 'Upload not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Upload deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting upload:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting upload', 
      error: error.message 
    });
  }
};
