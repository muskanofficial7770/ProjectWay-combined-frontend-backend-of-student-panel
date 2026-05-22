const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// Get all progress records
router.get('/', progressController.getAllProgress);

// Get progress by ID
router.get('/:id', progressController.getProgressById);

// Get progress by leader name
router.get('/leader/:leaderName', progressController.getProgressByLeaderName);

// Create new progress record
router.post('/', progressController.createProgress);

// Update progress
router.put('/:id', progressController.updateProgress);

// Update progress percentage
router.patch('/:id/progress', progressController.updateProgressPercentage);

// Add task to progress
router.post('/:id/tasks', progressController.addTask);

// Update task status
router.patch('/:id/tasks/:taskId', progressController.updateTaskStatus);

// Delete progress
router.delete('/:id', progressController.deleteProgress);

module.exports = router;
