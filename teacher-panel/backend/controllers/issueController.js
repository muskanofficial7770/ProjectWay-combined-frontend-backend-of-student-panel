const StudentIssue = require('../models/StudentIssue');

// Get all student issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await StudentIssue.find().sort({ timestamp: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get issue by ID
exports.getIssueById = async (req, res) => {
  try {
    const issue = await StudentIssue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new issue
exports.createIssue = async (req, res) => {
  try {
    const issue = new StudentIssue(req.body);
    const savedIssue = await issue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Reply to issue
exports.replyToIssue = async (req, res) => {
  try {
    const { teacherReply } = req.body;
    const issue = await StudentIssue.findByIdAndUpdate(
      req.params.id,
      { teacherReply, status: 'Replied', repliedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(issue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update issue status
exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await StudentIssue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(issue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete issue
exports.deleteIssue = async (req, res) => {
  try {
    const issue = await StudentIssue.findByIdAndDelete(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get issues by category
exports.getIssuesByCategory = async (req, res) => {
  try {
    const issues = await StudentIssue.find({ category: req.params.category }).sort({ timestamp: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
