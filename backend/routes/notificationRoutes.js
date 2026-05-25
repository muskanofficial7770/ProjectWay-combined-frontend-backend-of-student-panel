import express from 'express';
import {
  getAllNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from '../controllers/notificationController.js';

const router = express.Router();

// Get all notifications (for teacher)
router.get('/all', getAllNotifications);

// Get unread notifications
router.get('/unread', getUnreadNotifications);

// Mark notification as read
router.put('/read/:id', markAsRead);

// Mark all notifications as read
router.put('/read-all', markAllAsRead);

// Delete notification
router.delete('/:id', deleteNotification);

export default router;
