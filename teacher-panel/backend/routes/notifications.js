const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get all notifications
router.get('/', notificationController.getAllNotifications);

// Get notification by ID
router.get('/:id', notificationController.getNotificationById);

// Get unread notifications count
router.get('/unread/count', notificationController.getUnreadCount);

// Create new notification
router.post('/', notificationController.createNotification);

// Mark notification as read
router.patch('/:id/read', notificationController.markAsRead);

// Mark all notifications as read
router.patch('/read-all', notificationController.markAllAsRead);

// Get notifications by leader name (student's notifications)
router.get('/leader/:leaderName', notificationController.getNotificationsByLeader);

// Get unread count by leader
router.get('/leader/:leaderName/unread', notificationController.getUnreadCountByLeader);

// Mark all notifications as read by leader
router.patch('/leader/:leaderName/read-all', notificationController.markAllAsReadByLeader);

// Delete notification
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
