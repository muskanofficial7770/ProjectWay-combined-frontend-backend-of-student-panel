const Idea = require('../models/Idea');
const Notification = require('../models/Notification');

// Get all ideas
exports.getAllIdeas = async (req, res) => {
  console.log('💡 [Teacher Ideas] Get all ideas request received');
  
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    console.log('✅ [Teacher Ideas] Retrieved', ideas.length, 'ideas');
    res.json(ideas);
  } catch (error) {
    console.error('❌ [Teacher Ideas] Error fetching ideas:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get idea by ID
exports.getIdeaById = async (req, res) => {
  console.log('💡 [Teacher Ideas] Get idea by ID request received');
  console.log('💡 [Teacher Ideas] Idea ID:', req.params.id);
  
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      console.log('⚠️ [Teacher Ideas] Idea not found:', req.params.id);
      return res.status(404).json({ message: 'Idea not found' });
    }
    console.log('✅ [Teacher Ideas] Idea retrieved successfully:', idea.title);
    res.json(idea);
  } catch (error) {
    console.error('❌ [Teacher Ideas] Error fetching idea:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new idea
exports.createIdea = async (req, res) => {
  console.log('💡 [Teacher Ideas] Create idea request received');
  console.log('💡 [Teacher Ideas] Request body:', req.body);
  
  try {
    const idea = new Idea(req.body);
    const savedIdea = await idea.save();
    console.log('✅ [Teacher Ideas] Idea created successfully:', savedIdea.title);
    res.status(201).json(savedIdea);
  } catch (error) {
    console.error('❌ [Teacher Ideas] Error creating idea:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update idea
exports.updateIdea = async (req, res) => {
  console.log('💡 [Teacher Ideas] Update idea request received');
  console.log('💡 [Teacher Ideas] Idea ID:', req.params.id);
  
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!idea) {
      console.log('⚠️ [Teacher Ideas] Idea not found:', req.params.id);
      return res.status(404).json({ message: 'Idea not found' });
    }
    console.log('✅ [Teacher Ideas] Idea updated successfully:', idea.title);
    res.json(idea);
  } catch (error) {
    console.error('❌ [Teacher Ideas] Error updating idea:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update idea status
exports.updateIdeaStatus = async (req, res) => {
  console.log('💡 [Teacher Ideas] Update idea status request received');
  console.log('💡 [Teacher Ideas] Idea ID:', req.params.id);
  console.log('💡 [Teacher Ideas] New status:', req.body.status);
  
  try {
    const { status } = req.body;
    
    // Get the current idea to access its details
    const currentIdea = await Idea.findById(req.params.id);
    if (!currentIdea) {
      console.log('⚠️ [Teacher Ideas] Idea not found:', req.params.id);
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Update the idea status
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    console.log('✅ [Teacher Ideas] Idea status updated:', idea.title, '->', status);

    // Create a notification if status is Accepted or Rejected
    if (status === 'Accepted' || status === 'Rejected') {
      const notificationMessage = status === 'Accepted' 
        ? `Your idea "${idea.title}" has been accepted!`
        : `Your idea "${idea.title}" has been rejected.`;

      console.log('💡 [Teacher Ideas] Creating notification for student...');
      const notification = new Notification({
        ideaId: idea._id,
        title: idea.title,
        leaderName: idea.leader.name,
        status: status,
        message: notificationMessage
      });

      await notification.save();
      console.log('✅ [Teacher Ideas] Notification created successfully');
    }

    res.json(idea);
  } catch (error) {
    console.error('❌ [Teacher Ideas] Error updating idea status:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete idea
exports.deleteIdea = async (req, res) => {
  console.log('💡 [Teacher Ideas] Delete idea request received');
  console.log('💡 [Teacher Ideas] Idea ID:', req.params.id);
  
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) {
      console.log('⚠️ [Teacher Ideas] Idea not found:', req.params.id);
      return res.status(404).json({ message: 'Idea not found' });
    }
    console.log('✅ [Teacher Ideas] Idea deleted successfully:', idea.title);
    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    console.error('❌ [Teacher Ideas] Error deleting idea:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get ideas by status
exports.getIdeasByStatus = async (req, res) => {
  console.log('💡 [Teacher Ideas] Get ideas by status request received');
  console.log('💡 [Teacher Ideas] Status:', req.params.status);
  
  try {
    const ideas = await Idea.find({ status: req.params.status }).sort({ createdAt: -1 });
    console.log('✅ [Teacher Ideas] Retrieved', ideas.length, 'ideas with status:', req.params.status);
    res.json(ideas);
  } catch (error) {
    console.error('❌ [Teacher Ideas] Error fetching ideas by status:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get ideas by session
exports.getIdeasBySession = async (req, res) => {
  console.log('💡 [Teacher Ideas] Get ideas by session request received');
  console.log('💡 [Teacher Ideas] Session:', req.params.session);
  
  try {
    const ideas = await Idea.find({ session: req.params.session }).sort({ createdAt: -1 });
    console.log('✅ [Teacher Ideas] Retrieved', ideas.length, 'ideas for session:', req.params.session);
    res.json(ideas);
  } catch (error) {
    console.error('❌ [Teacher Ideas] Error fetching ideas by session:', error);
    res.status(500).json({ message: error.message });
  }
};
