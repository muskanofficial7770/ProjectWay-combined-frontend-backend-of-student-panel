const StudentIssue = require('../models/StudentIssue');

// Get all student issues
exports.getAllIssues = async (req, res) => {
  console.log('❓ [Teacher Issues] Get all issues request received');
  
  try {
    const issues = await StudentIssue.find().sort({ timestamp: -1 });
    console.log('✅ [Teacher Issues] Retrieved', issues.length, 'issues');
    res.json(issues);
  } catch (error) {
    console.error('❌ [Teacher Issues] Error fetching issues:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get issue by ID
exports.getIssueById = async (req, res) => {
  console.log('❓ [Teacher Issues] Get issue by ID request received');
  console.log('❓ [Teacher Issues] Issue ID:', req.params.id);
  
  try {
    const issue = await StudentIssue.findById(req.params.id);
    if (!issue) {
      console.log('⚠️ [Teacher Issues] Issue not found:', req.params.id);
      return res.status(404).json({ message: 'Issue not found' });
    }
    console.log('✅ [Teacher Issues] Issue retrieved successfully');
    res.json(issue);
  } catch (error) {
    console.error('❌ [Teacher Issues] Error fetching issue:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new issue
exports.createIssue = async (req, res) => {
  console.log('❓ [Teacher Issues] Create issue request received');
  console.log('❓ [Teacher Issues] Request body:', req.body);
  
  try {
    const issue = new StudentIssue(req.body);
    const savedIssue = await issue.save();
    console.log('✅ [Teacher Issues] Issue created successfully');
    res.status(201).json(savedIssue);
  } catch (error) {
    console.error('❌ [Teacher Issues] Error creating issue:', error);
    res.status(400).json({ message: error.message });
  }
};

// Reply to issue
exports.replyToIssue = async (req, res) => {
  console.log('❓ [Teacher Issues] Reply to issue request received');
  console.log('❓ [Teacher Issues] Issue ID:', req.params.id);
  console.log('❓ [Teacher Issues] Reply:', req.body.teacherReply);
  
  try {
    const { teacherReply } = req.body;
    const issue = await StudentIssue.findByIdAndUpdate(
      req.params.id,
      { teacherReply, status: 'Replied', repliedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!issue) {
      console.log('⚠️ [Teacher Issues] Issue not found:', req.params.id);
      return res.status(404).json({ message: 'Issue not found' });
    }
    console.log('✅ [Teacher Issues] Issue replied successfully');
    res.json(issue);
  } catch (error) {
    console.error('❌ [Teacher Issues] Error replying to issue:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update issue status
exports.updateIssueStatus = async (req, res) => {
  console.log('❓ [Teacher Issues] Update issue status request received');
  console.log('❓ [Teacher Issues] Issue ID:', req.params.id);
  console.log('❓ [Teacher Issues] New status:', req.body.status);
  
  try {
    const { status } = req.body;
    const issue = await StudentIssue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!issue) {
      console.log('⚠️ [Teacher Issues] Issue not found:', req.params.id);
      return res.status(404).json({ message: 'Issue not found' });
    }
    console.log('✅ [Teacher Issues] Issue status updated successfully');
    res.json(issue);
  } catch (error) {
    console.error('❌ [Teacher Issues] Error updating issue status:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete issue
exports.deleteIssue = async (req, res) => {
  console.log('❓ [Teacher Issues] Delete issue request received');
  console.log('❓ [Teacher Issues] Issue ID:', req.params.id);
  
  try {
    const issue = await StudentIssue.findByIdAndDelete(req.params.id);
    if (!issue) {
      console.log('⚠️ [Teacher Issues] Issue not found:', req.params.id);
      return res.status(404).json({ message: 'Issue not found' });
    }
    console.log('✅ [Teacher Issues] Issue deleted successfully');
    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    console.error('❌ [Teacher Issues] Error deleting issue:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get issues by category
exports.getIssuesByCategory = async (req, res) => {
  console.log('❓ [Teacher Issues] Get issues by category request received');
  console.log('❓ [Teacher Issues] Category:', req.params.category);
  
  try {
    const issues = await StudentIssue.find({ category: req.params.category }).sort({ timestamp: -1 });
    console.log('✅ [Teacher Issues] Retrieved', issues.length, 'issues for category:', req.params.category);
    res.json(issues);
  } catch (error) {
    console.error('❌ [Teacher Issues] Error fetching issues by category:', error);
    res.status(500).json({ message: error.message });
  }
};
