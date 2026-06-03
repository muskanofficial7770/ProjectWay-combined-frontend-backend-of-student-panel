import StudentIdea from '../models/StudentIdea.js';
import Notification from '../models/Notification.js';

// Submit a new student idea
export const submitIdea = async (req, res) => {
  console.log('📝 [Student Ideas] Submit idea request received');
  console.log('📝 [Student Ideas] Request body:', req.body);
  
  try {
    const { title, session, leaderName, description, members } = req.body;

    console.log('📝 [Student Ideas] Checking for duplicate ideas...');
    // Check for duplicate submissions
    const existingIdea = await StudentIdea.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      fullDescription: { $regex: new RegExp(`^${description}$`, 'i') }
    });

    if (existingIdea) {
      console.log('⚠️ [Student Ideas] Duplicate idea found:', existingIdea.title);
      return res.status(400).json({ 
        success: false, 
        message: 'This project idea already submitted by another student!' 
      });
    }

    console.log('📝 [Student Ideas] Creating new idea...');
    const newIdea = new StudentIdea({
      title,
      session,
      leader: { name: leaderName },
      shortDescription: description.substring(0, 100) + '...',
      fullDescription: description,
      team: members.map(name => ({ name })),
      status: 'Pending'
    });

    const savedIdea = await newIdea.save();
    console.log('✅ [Student Ideas] Idea saved successfully:', savedIdea._id);

    console.log('📝 [Student Ideas] Creating notification for teacher...');
    // Create notification for teacher
    const notification = new Notification({
      ideaId: savedIdea.id,
      title: savedIdea.title,
      leaderName: leaderName,
      read: false,
      submittedAt: savedIdea.submittedAt,
      type: 'idea_submission'
    });

    await notification.save();
    console.log('✅ [Student Ideas] Notification created successfully');

    res.status(201).json({ 
      success: true, 
      message: 'Project idea submitted successfully!',
      idea: savedIdea 
    });
  } catch (error) {
    console.error('❌ [Student Ideas] Error submitting idea:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting idea', 
      error: error.message 
    });
  }
};

// Get all student ideas
export const getAllIdeas = async (req, res) => {
  console.log('📝 [Student Ideas] Get all ideas request received');
  
  try {
    const ideas = await StudentIdea.find().sort({ submittedAt: -1 });
    console.log('✅ [Student Ideas] Retrieved', ideas.length, 'ideas');
    res.status(200).json({ success: true, ideas });
  } catch (error) {
    console.error('❌ [Student Ideas] Error fetching ideas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching ideas', 
      error: error.message 
    });
  }
};

// Get ideas by leader name
export const getIdeasByLeader = async (req, res) => {
  console.log('📝 [Student Ideas] Get ideas by leader request received');
  console.log('📝 [Student Ideas] Leader name:', req.params.leaderName);
  
  try {
    const { leaderName } = req.params;
    const ideas = await StudentIdea.find({ 
      'leader.name': leaderName 
    }).sort({ submittedAt: -1 });
    console.log('✅ [Student Ideas] Retrieved', ideas.length, 'ideas for leader:', leaderName);
    res.status(200).json({ success: true, ideas });
  } catch (error) {
    console.error('❌ [Student Ideas] Error fetching ideas by leader:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching ideas', 
      error: error.message 
    });
  }
};

// Update idea status (for teacher)
export const updateIdeaStatus = async (req, res) => {
  console.log('📝 [Student Ideas] Update idea status request received');
  console.log('📝 [Student Ideas] Idea ID:', req.params.id);
  console.log('📝 [Student Ideas] New status:', req.body.status);
  
  try {
    const { id } = req.params;
    const { status, feedback } = req.body;

    const updatedIdea = await StudentIdea.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedIdea) {
      console.log('⚠️ [Student Ideas] Idea not found:', id);
      return res.status(404).json({ 
        success: false, 
        message: 'Idea not found' 
      });
    }

    console.log('✅ [Student Ideas] Idea status updated successfully:', id);
    res.status(200).json({ 
      success: true, 
      message: 'Idea status updated successfully',
      idea: updatedIdea 
    });
  } catch (error) {
    console.error('❌ [Student Ideas] Error updating idea status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating idea status', 
      error: error.message 
    });
  }
};

// Get idea statistics
export const getIdeaStats = async (req, res) => {
  console.log('📝 [Student Ideas] Get idea statistics request received');
  
  try {
    const ideas = await StudentIdea.find();
    const submitted = ideas.length;
    const approved = ideas.filter(idea => idea.status === 'Accepted').length;
    const inProgress = ideas.filter(idea => idea.status === 'Pending').length;

    console.log('📊 [Student Ideas] Statistics - Submitted:', submitted, 'Approved:', approved, 'In Progress:', inProgress);
    res.status(200).json({ 
      success: true, 
      stats: { submitted, approved, inProgress } 
    });
  } catch (error) {
    console.error('❌ [Student Ideas] Error fetching idea stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching idea stats', 
      error: error.message 
    });
  }
};
