const TeacherFeedback = require('../models/TeacherFeedback');

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await TeacherFeedback.find().sort({ timestamp: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await TeacherFeedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by idea ID
exports.getFeedbackByIdeaId = async (req, res) => {
  try {
    const feedback = await TeacherFeedback.find({ ideaId: req.params.ideaId }).sort({ timestamp: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const feedback = new TeacherFeedback(req.body);
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await TeacherFeedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
