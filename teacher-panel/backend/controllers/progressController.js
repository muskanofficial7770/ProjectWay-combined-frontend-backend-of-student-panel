const StudentProgress = require('../models/StudentProgress');

// Get all progress records
exports.getAllProgress = async (req, res) => {
  console.log('📊 [Teacher Progress] Get all progress request received');
  
  try {
    const progress = await StudentProgress.find().sort({ updatedAt: -1 });
    console.log('✅ [Teacher Progress] Retrieved', progress.length, 'progress records');
    res.json(progress);
  } catch (error) {
    console.error('❌ [Teacher Progress] Error fetching progress:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get progress by ID
exports.getProgressById = async (req, res) => {
  console.log('📊 [Teacher Progress] Get progress by ID request received');
  console.log('📊 [Teacher Progress] Progress ID:', req.params.id);
  
  try {
    const progress = await StudentProgress.findById(req.params.id);
    if (!progress) {
      console.log('⚠️ [Teacher Progress] Progress not found:', req.params.id);
      return res.status(404).json({ message: 'Progress not found' });
    }
    console.log('✅ [Teacher Progress] Progress retrieved successfully');
    res.json(progress);
  } catch (error) {
    console.error('❌ [Teacher Progress] Error fetching progress:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get progress by leader name
exports.getProgressByLeaderName = async (req, res) => {
  console.log('📊 [Teacher Progress] Get progress by leader name request received');
  console.log('📊 [Teacher Progress] Leader name:', req.params.leaderName);
  
  try {
    const progress = await StudentProgress.findOne({ leaderName: req.params.leaderName });
    if (!progress) {
      console.log('⚠️ [Teacher Progress] Progress not found for leader:', req.params.leaderName);
      return res.status(404).json({ message: 'Progress not found' });
    }
    console.log('✅ [Teacher Progress] Progress retrieved successfully for leader:', req.params.leaderName);
    res.json(progress);
  } catch (error) {
    console.error('❌ [Teacher Progress] Error fetching progress by leader:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new progress record
exports.createProgress = async (req, res) => {
  console.log('📊 [Teacher Progress] Create progress request received');
  console.log('📊 [Teacher Progress] Request body:', req.body);
  
  try {
    const progress = new StudentProgress(req.body);
    const savedProgress = await progress.save();
    console.log('✅ [Teacher Progress] Progress created successfully');
    res.status(201).json(savedProgress);
  } catch (error) {
    console.error('❌ [Teacher Progress] Error creating progress:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update progress
exports.updateProgress = async (req, res) => {
  console.log('📊 [Teacher Progress] Update progress request received');
  console.log('📊 [Teacher Progress] Progress ID:', req.params.id);
  
  try {
    const progress = await StudentProgress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!progress) {
      console.log('⚠️ [Teacher Progress] Progress not found:', req.params.id);
      return res.status(404).json({ message: 'Progress not found' });
    }
    console.log('✅ [Teacher Progress] Progress updated successfully');
    res.json(progress);
  } catch (error) {
    console.error('❌ [Teacher Progress] Error updating progress:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update progress percentage
exports.updateProgressPercentage = async (req, res) => {
  console.log('📊 [Teacher Progress] Update progress percentage request received');
  console.log('📊 [Teacher Progress] Progress ID:', req.params.id);
  console.log('📊 [Teacher Progress] New progress:', req.body.progress);
  
  try {
    const { progress } = req.body;
    const studentProgress = await StudentProgress.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true, runValidators: true }
    );
    if (!studentProgress) {
      console.log('⚠️ [Teacher Progress] Progress not found:', req.params.id);
      return res.status(404).json({ message: 'Progress not found' });
    }
    console.log('✅ [Teacher Progress] Progress percentage updated successfully');
    res.json(studentProgress);
  } catch (error) {
    console.error('❌ [Teacher Progress] Error updating progress percentage:', error);
    res.status(400).json({ message: error.message });
  }
};

// Add task to progress
exports.addTask = async (req, res) => {
  console.log('📊 [Teacher Progress] Add task request received');
  console.log('📊 [Teacher Progress] Progress ID:', req.params.id);
  console.log('📊 [Teacher Progress] Task:', req.body);
  
  try {
    const { title, status } = req.body;
    const progress = await StudentProgress.findById(req.params.id);
    if (!progress) {
      console.log('⚠️ [Teacher Progress] Progress not found:', req.params.id);
      return res.status(404).json({ message: 'Progress not found' });
    }
    progress.tasks.push({ title, status });
    await progress.save();
    console.log('✅ [Teacher Progress] Task added successfully');
    res.json(progress);
  } catch (error) {
    console.error('❌ [Teacher Progress] Error adding task:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  console.log('📊 [Teacher Progress] Update task status request received');
  console.log('📊 [Teacher Progress] Progress ID:', req.params.id);
  console.log('📊 [Teacher Progress] Task ID:', req.params.taskId);
  console.log('📊 [Teacher Progress] New status:', req.body.status);
  
  try {
    const { status } = req.body;
    const progress = await StudentProgress.findById(req.params.id);
    if (!progress) {
      console.log('⚠️ [Teacher Progress] Progress not found:', req.params.id);
      return res.status(404).json({ message: 'Progress not found' });
    }
    const task = progress.tasks.id(req.params.taskId);
    if (!task) {
      console.log('⚠️ [Teacher Progress] Task not found:', req.params.taskId);
      return res.status(404).json({ message: 'Task not found' });
    }
    task.status = status;
    await progress.save();
    console.log('✅ [Teacher Progress] Task status updated successfully');
    res.json(progress);
  } catch (error) {
    console.error('❌ [Teacher Progress] Error updating task status:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete progress
exports.deleteProgress = async (req, res) => {
  console.log('📊 [Teacher Progress] Delete progress request received');
  console.log('📊 [Teacher Progress] Progress ID:', req.params.id);
  
  try {
    const progress = await StudentProgress.findByIdAndDelete(req.params.id);
    if (!progress) {
      console.log('⚠️ [Teacher Progress] Progress not found:', req.params.id);
      return res.status(404).json({ message: 'Progress not found' });
    }
    console.log('✅ [Teacher Progress] Progress deleted successfully');
    res.json({ message: 'Progress deleted successfully' });
  } catch (error) {
    console.error('❌ [Teacher Progress] Error deleting progress:', error);
    res.status(500).json({ message: error.message });
  }
};
