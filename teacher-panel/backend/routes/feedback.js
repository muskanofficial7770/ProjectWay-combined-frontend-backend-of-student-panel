const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Get all feedback
router.get('/', feedbackController.getAllFeedback);

// Get feedback by ID
router.get('/:id', feedbackController.getFeedbackById);

// Get feedback by idea ID
router.get('/idea/:ideaId', feedbackController.getFeedbackByIdeaId);

// Create new feedback
router.post('/', feedbackController.createFeedback);

// Delete feedback
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
