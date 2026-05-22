const StudentProgress = require('../models/StudentProgress');

// Get all progress records
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await StudentProgress.find().sort({ updatedAt: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get progress by ID
exports.getProgressById = async (req, res) => {
  try {
    const progress = await StudentProgress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get progress by leader name
exports.getProgressByLeaderName = async (req, res) => {
  try {
    const progress = await StudentProgress.findOne({ leaderName: req.params.leaderName });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new progress record
exports.createProgress = async (req, res) => {
  try {
    const progress = new StudentProgress(req.body);
    const savedProgress = await progress.save();
    res.status(201).json(savedProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update progress
exports.updateProgress = async (req, res) => {
  try {
    const progress = await StudentProgress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update progress percentage
exports.updateProgressPercentage = async (req, res) => {
  try {
    const { progress } = req.body;
    const studentProgress = await StudentProgress.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true, runValidators: true }
    );
    if (!studentProgress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    res.json(studentProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add task to progress
exports.addTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const progress = await StudentProgress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    progress.tasks.push({ title, status });
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const progress = await StudentProgress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    const task = progress.tasks.id(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.status = status;
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete progress
exports.deleteProgress = async (req, res) => {
  try {
    const progress = await StudentProgress.findByIdAndDelete(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    res.json({ message: 'Progress deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
