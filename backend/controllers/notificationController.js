import Notification from '../models/Notification.js';

// Get all notifications (for teacher)
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ submittedAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching notifications', 
      error: error.message 
    });
  }
};

// Get unread notifications
export const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ read: false }).sort({ submittedAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching unread notifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching unread notifications', 
      error: error.message 
    });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Notification marked as read',
      notification 
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error marking notification as read', 
      error: error.message 
    });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    res.status(200).json({ 
      success: true, 
      message: 'All notifications marked as read' 
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error marking all notifications as read', 
      error: error.message 
    });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Notification deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting notification', 
      error: error.message 
    });
  }
};
