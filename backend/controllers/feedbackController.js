import Feedback from '../models/Feedback.js';

// Create feedback (for teacher)
export const createFeedback = async (req, res) => {
  try {
    const { ideaId, ideaTitle, leaderName, feedback, status, teacherName } = req.body;

    const newFeedback = new Feedback({
      ideaId,
      ideaTitle,
      leaderName,
      feedback,
      status: status || 'Feedback Sent',
      teacherName
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json({ 
      success: true, 
      message: 'Feedback sent successfully!',
      feedback: savedFeedback 
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating feedback', 
      error: error.message 
    });
  }
};

// Get all feedback for a student
export const getFeedbackByLeader = async (req, res) => {
  try {
    const { leaderName } = req.params;
    const feedbacks = await Feedback.find({ leaderName }).sort({ timestamp: -1 });
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching feedbacks', 
      error: error.message 
    });
  }
};

// Get all feedback (for teacher)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 });
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching feedbacks', 
      error: error.message 
    });
  }
};

// Get feedback by idea ID
export const getFeedbackByIdea = async (req, res) => {
  try {
    const { ideaId } = req.params;
    const feedbacks = await Feedback.find({ ideaId }).sort({ timestamp: -1 });
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching feedbacks', 
      error: error.message 
    });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ 
        success: false, 
        message: 'Feedback not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Feedback deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting feedback', 
      error: error.message 
    });
  }
};
