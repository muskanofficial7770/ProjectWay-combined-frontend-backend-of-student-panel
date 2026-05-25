import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { name, assignedTo, deadline, projectName, leaderName } = req.body;

    const newTask = new Task({
      id: Date.now().toString(),
      name,
      assignedTo,
      deadline: deadline || 'TBD',
      status: 'Pending',
      initials: assignedTo.charAt(0).toUpperCase(),
      colorClass: 'bg-slate-200 text-slate-700',
      projectName,
      leaderName
    });

    const savedTask = await newTask.save();

    res.status(201).json({ 
      success: true, 
      message: 'Task created successfully!',
      task: savedTask 
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating task', 
      error: error.message 
    });
  }
};

// Get all tasks for a project
export const getTasksByProject = async (req, res) => {
  try {
    const { projectName } = req.params;
    const tasks = await Task.find({ projectName }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tasks', 
      error: error.message 
    });
  }
};

// Get tasks by assignee
export const getTasksByAssignee = async (req, res) => {
  try {
    const { assignee } = req.params;
    const tasks = await Task.find({ assignedTo: assignee }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks by assignee:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tasks', 
      error: error.message 
    });
  }
};

// Toggle task status
export const toggleTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ id });

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
    const updatedTask = await task.save();

    res.status(200).json({ 
      success: true, 
      message: 'Task status updated successfully',
      task: updatedTask 
    });
  } catch (error) {
    console.error('Error toggling task status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error toggling task status', 
      error: error.message 
    });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ id });

    if (!deletedTask) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Task deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting task', 
      error: error.message 
    });
  }
};

// Get task statistics for a project
export const getTaskStats = async (req, res) => {
  try {
    const { projectName } = req.params;
    const tasks = await Task.find({ projectName });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Get member statistics
    const assignees = [...new Set(tasks.map(t => t.assignedTo))];
    const memberStats = assignees.map(person => {
      const personTasks = tasks.filter(t => t.assignedTo === person);
      const personTotal = personTasks.length;
      const personCompleted = personTasks.filter(t => t.status === 'Completed').length;
      const personProgress = personTotal === 0 ? 0 : Math.round((personCompleted / personTotal) * 100);
      
      return {
        name: person,
        total: personTotal,
        completed: personCompleted,
        progress: personProgress
      };
    });

    res.status(200).json({ 
      success: true, 
      stats: {
        total: totalTasks,
        completed: completedTasks,
        progress: progressPercentage,
        memberStats
      } 
    });
  } catch (error) {
    console.error('Error fetching task stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching task stats', 
      error: error.message 
    });
  }
};
