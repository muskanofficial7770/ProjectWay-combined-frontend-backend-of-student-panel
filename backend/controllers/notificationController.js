import Notification from '../models/Notification.js';

// Get all notifications (for teacher)
export const getAllNotifications = async (req, res) => {
  console.log('🔔 [Notifications] Get all notifications request received');
  
  try {
    const notifications = await Notification.find().sort({ submittedAt: -1 });
    console.log('✅ [Notifications] Retrieved', notifications.length, 'notifications total');
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('❌ [Notifications] Error fetching notifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching notifications', 
      error: error.message 
    });
  }
};

// Get unread notifications
export const getUnreadNotifications = async (req, res) => {
  console.log('🔔 [Notifications] Get unread notifications request received');
  
  try {
    const notifications = await Notification.find({ read: false }).sort({ submittedAt: -1 });
    console.log('✅ [Notifications] Retrieved', notifications.length, 'unread notifications');
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('❌ [Notifications] Error fetching unread notifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching unread notifications', 
      error: error.message 
    });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  console.log('🔔 [Notifications] Mark notification as read request received');
  console.log('🔔 [Notifications] Notification ID:', req.params.id);
  
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      console.log('⚠️ [Notifications] Notification not found:', id);
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    console.log('✅ [Notifications] Notification marked as read:', id);
    res.status(200).json({ 
      success: true, 
      message: 'Notification marked as read',
      notification 
    });
  } catch (error) {
    console.error('❌ [Notifications] Error marking notification as read:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error marking notification as read', 
      error: error.message 
    });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  console.log('🔔 [Notifications] Mark all notifications as read request received');
  
  try {
    const result = await Notification.updateMany({ read: false }, { read: true });
    console.log('✅ [Notifications] Marked', result.modifiedCount, 'notifications as read');
    res.status(200).json({ 
      success: true, 
      message: 'All notifications marked as read' 
    });
  } catch (error) {
    console.error('❌ [Notifications] Error marking all notifications as read:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error marking all notifications as read', 
      error: error.message 
    });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  console.log('🔔 [Notifications] Delete notification request received');
  console.log('🔔 [Notifications] Notification ID:', req.params.id);
  
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      console.log('⚠️ [Notifications] Notification not found:', id);
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    console.log('✅ [Notifications] Notification deleted successfully:', id);
    res.status(200).json({ 
      success: true, 
      message: 'Notification deleted successfully' 
    });
  } catch (error) {
    console.error('❌ [Notifications] Error deleting notification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting notification', 
      error: error.message 
    });
  }
};
