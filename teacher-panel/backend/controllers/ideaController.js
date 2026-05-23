const Idea = require('../models/Idea');
const Notification = require('../models/Notification');

// Get all ideas
exports.getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get idea by ID
exports.getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new idea
exports.createIdea = async (req, res) => {
  try {
    const idea = new Idea(req.body);
    const savedIdea = await idea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update idea
exports.updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update idea status
exports.updateIdeaStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Get the current idea to access its details
    const currentIdea = await Idea.findById(req.params.id);
    if (!currentIdea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Update the idea status
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    // Create a notification if status is Accepted or Rejected
    if (status === 'Accepted' || status === 'Rejected') {
      const notificationMessage = status === 'Accepted' 
        ? `Your idea "${idea.title}" has been accepted!`
        : `Your idea "${idea.title}" has been rejected.`;

      const notification = new Notification({
        ideaId: idea._id,
        title: idea.title,
        leaderName: idea.leader.name,
        status: status,
        message: notificationMessage
      });

      await notification.save();
    }

    res.json(idea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete idea
exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ideas by status
exports.getIdeasByStatus = async (req, res) => {
  try {
    const ideas = await Idea.find({ status: req.params.status }).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ideas by session
exports.getIdeasBySession = async (req, res) => {
  try {
    const ideas = await Idea.find({ session: req.params.session }).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
