const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Get all student issues
router.get('/', issueController.getAllIssues);

// Get issue by ID
router.get('/:id', issueController.getIssueById);

// Create new issue
router.post('/', issueController.createIssue);

// Reply to issue
router.put('/:id/reply', issueController.replyToIssue);

// Update issue status
router.patch('/:id/status', issueController.updateIssueStatus);

// Delete issue
router.delete('/:id', issueController.deleteIssue);

// Get issues by category
router.get('/category/:category', issueController.getIssuesByCategory);

module.exports = router;
