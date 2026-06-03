const TeacherFeedback = require('../models/TeacherFeedback');

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  console.log('💬 [Teacher Feedback] Get all feedback request received');
  
  try {
    const feedback = await TeacherFeedback.find().sort({ timestamp: -1 });
    console.log('✅ [Teacher Feedback] Retrieved', feedback.length, 'feedback entries');
    res.json(feedback);
  } catch (error) {
    console.error('❌ [Teacher Feedback] Error fetching feedback:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  console.log('💬 [Teacher Feedback] Get feedback by ID request received');
  console.log('💬 [Teacher Feedback] Feedback ID:', req.params.id);
  
  try {
    const feedback = await TeacherFeedback.findById(req.params.id);
    if (!feedback) {
      console.log('⚠️ [Teacher Feedback] Feedback not found:', req.params.id);
      return res.status(404).json({ message: 'Feedback not found' });
    }
    console.log('✅ [Teacher Feedback] Feedback retrieved successfully');
    res.json(feedback);
  } catch (error) {
    console.error('❌ [Teacher Feedback] Error fetching feedback:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by idea ID
exports.getFeedbackByIdeaId = async (req, res) => {
  console.log('💬 [Teacher Feedback] Get feedback by idea ID request received');
  console.log('💬 [Teacher Feedback] Idea ID:', req.params.ideaId);
  
  try {
    const feedback = await TeacherFeedback.find({ ideaId: req.params.ideaId }).sort({ timestamp: -1 });
    console.log('✅ [Teacher Feedback] Retrieved', feedback.length, 'feedback entries for idea:', req.params.ideaId);
    res.json(feedback);
  } catch (error) {
    console.error('❌ [Teacher Feedback] Error fetching feedback by idea ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new feedback
exports.createFeedback = async (req, res) => {
  console.log('💬 [Teacher Feedback] Create feedback request received');
  console.log('💬 [Teacher Feedback] Request body:', req.body);
  
  try {
    const feedback = new TeacherFeedback(req.body);
    const savedFeedback = await feedback.save();
    console.log('✅ [Teacher Feedback] Feedback created successfully');
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('❌ [Teacher Feedback] Error creating feedback:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  console.log('💬 [Teacher Feedback] Delete feedback request received');
  console.log('💬 [Teacher Feedback] Feedback ID:', req.params.id);
  
  try {
    const feedback = await TeacherFeedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      console.log('⚠️ [Teacher Feedback] Feedback not found:', req.params.id);
      return res.status(404).json({ message: 'Feedback not found' });
    }
    console.log('✅ [Teacher Feedback] Feedback deleted successfully');
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('❌ [Teacher Feedback] Error deleting feedback:', error);
    res.status(500).json({ message: error.message });
  }
};
