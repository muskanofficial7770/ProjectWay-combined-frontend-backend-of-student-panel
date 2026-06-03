import Feedback from '../models/Feedback.js';

// Create feedback (for teacher)
export const createFeedback = async (req, res) => {
  console.log('💬 [Feedback] Create feedback request received');
  console.log('💬 [Feedback] Request body:', req.body);
  
  try {
    const { ideaId, ideaTitle, leaderName, feedback, status, teacherName } = req.body;

    console.log('💬 [Feedback] Creating new feedback...');
    const newFeedback = new Feedback({
      ideaId,
      ideaTitle,
      leaderName,
      feedback,
      status: status || 'Feedback Sent',
      teacherName
    });

    const savedFeedback = await newFeedback.save();
    console.log('✅ [Feedback] Feedback created successfully for idea:', ideaTitle);

    res.status(201).json({ 
      success: true, 
      message: 'Feedback sent successfully!',
      feedback: savedFeedback 
    });
  } catch (error) {
    console.error('❌ [Feedback] Error creating feedback:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating feedback', 
      error: error.message 
    });
  }
};

// Get all feedback for a student
export const getFeedbackByLeader = async (req, res) => {
  console.log('💬 [Feedback] Get feedback by leader request received');
  console.log('💬 [Feedback] Leader name:', req.params.leaderName);
  
  try {
    const { leaderName } = req.params;
    const feedbacks = await Feedback.find({ leaderName }).sort({ timestamp: -1 });
    console.log('✅ [Feedback] Retrieved', feedbacks.length, 'feedbacks for leader:', leaderName);
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('❌ [Feedback] Error fetching feedbacks:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching feedbacks', 
      error: error.message 
    });
  }
};

// Get all feedback (for teacher)
export const getAllFeedback = async (req, res) => {
  console.log('💬 [Feedback] Get all feedback request received');
  
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 });
    console.log('✅ [Feedback] Retrieved', feedbacks.length, 'feedbacks total');
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('❌ [Feedback] Error fetching feedbacks:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching feedbacks', 
      error: error.message 
    });
  }
};

// Get feedback by idea ID
export const getFeedbackByIdea = async (req, res) => {
  console.log('💬 [Feedback] Get feedback by idea request received');
  console.log('💬 [Feedback] Idea ID:', req.params.ideaId);
  
  try {
    const { ideaId } = req.params;
    const feedbacks = await Feedback.find({ ideaId }).sort({ timestamp: -1 });
    console.log('✅ [Feedback] Retrieved', feedbacks.length, 'feedbacks for idea:', ideaId);
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('❌ [Feedback] Error fetching feedbacks:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching feedbacks', 
      error: error.message 
    });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  console.log('💬 [Feedback] Delete feedback request received');
  console.log('💬 [Feedback] Feedback ID:', req.params.id);
  
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      console.log('⚠️ [Feedback] Feedback not found:', id);
      return res.status(404).json({ 
        success: false, 
        message: 'Feedback not found' 
      });
    }

    console.log('✅ [Feedback] Feedback deleted successfully:', id);
    res.status(200).json({ 
      success: true, 
      message: 'Feedback deleted successfully' 
    });
  } catch (error) {
    console.error('❌ [Feedback] Error deleting feedback:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting feedback', 
      error: error.message 
    });
  }
};
