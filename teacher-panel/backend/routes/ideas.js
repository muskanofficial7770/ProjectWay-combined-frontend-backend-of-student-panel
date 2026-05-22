const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');

// Get all ideas
router.get('/', ideaController.getAllIdeas);

// Get idea by ID
router.get('/:id', ideaController.getIdeaById);

// Create new idea
router.post('/', ideaController.createIdea);

// Update idea
router.put('/:id', ideaController.updateIdea);

// Update idea status
router.patch('/:id/status', ideaController.updateIdeaStatus);

// Delete idea
router.delete('/:id', ideaController.deleteIdea);

// Get ideas by status
router.get('/status/:status', ideaController.getIdeasByStatus);

// Get ideas by session
router.get('/session/:session', ideaController.getIdeasBySession);

module.exports = router;
