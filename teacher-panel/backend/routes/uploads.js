const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Get all uploads
router.get('/', uploadController.getAllUploads);

// Get upload by ID
router.get('/:id', uploadController.getUploadById);

// Create new upload
router.post('/', uploadController.createUpload);

// Delete upload
router.delete('/:id', uploadController.deleteUpload);

// Get uploads by teacher
router.get('/teacher/:teacherName', uploadController.getUploadsByTeacher);

module.exports = router;
