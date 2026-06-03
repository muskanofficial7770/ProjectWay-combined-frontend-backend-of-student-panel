const Notification = require('../models/Notification');

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Get all notifications request received');
  
  try {
    const notifications = await Notification.find().sort({ submittedAt: -1 });
    console.log('✅ [Teacher Notifications] Retrieved', notifications.length, 'notifications');
    res.json(notifications);
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error fetching notifications:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get notification by ID
exports.getNotificationById = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Get notification by ID request received');
  console.log('🔔 [Teacher Notifications] Notification ID:', req.params.id);
  
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      console.log('⚠️ [Teacher Notifications] Notification not found:', req.params.id);
      return res.status(404).json({ message: 'Notification not found' });
    }
    console.log('✅ [Teacher Notifications] Notification retrieved successfully');
    res.json(notification);
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error fetching notification:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get notifications by leader name (student's notifications)
exports.getNotificationsByLeader = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Get notifications by leader request received');
  console.log('🔔 [Teacher Notifications] Leader name:', req.params.leaderName);
  
  try {
    const { leaderName } = req.params;
    const notifications = await Notification.find({ leaderName }).sort({ submittedAt: -1 });
    console.log('✅ [Teacher Notifications] Retrieved', notifications.length, 'notifications for leader:', leaderName);
    res.json(notifications);
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error fetching notifications by leader:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get unread notifications count
exports.getUnreadCount = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Get unread count request received');
  
  try {
    const count = await Notification.countDocuments({ read: false });
    console.log('✅ [Teacher Notifications] Unread count:', count);
    res.json({ count });
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error fetching unread count:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get unread notifications count by leader
exports.getUnreadCountByLeader = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Get unread count by leader request received');
  console.log('🔔 [Teacher Notifications] Leader name:', req.params.leaderName);
  
  try {
    const { leaderName } = req.params;
    const count = await Notification.countDocuments({ leaderName, read: false });
    console.log('✅ [Teacher Notifications] Unread count for leader:', leaderName, '=', count);
    res.json({ count });
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error fetching unread count by leader:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new notification
exports.createNotification = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Create notification request received');
  console.log('🔔 [Teacher Notifications] Request body:', req.body);
  
  try {
    const notification = new Notification(req.body);
    const savedNotification = await notification.save();
    console.log('✅ [Teacher Notifications] Notification created successfully');
    res.status(201).json(savedNotification);
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error creating notification:', error);
    res.status(400).json({ message: error.message });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Mark notification as read request received');
  console.log('🔔 [Teacher Notifications] Notification ID:', req.params.id);
  
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true, runValidators: true }
    );
    if (!notification) {
      console.log('⚠️ [Teacher Notifications] Notification not found:', req.params.id);
      return res.status(404).json({ message: 'Notification not found' });
    }
    console.log('✅ [Teacher Notifications] Notification marked as read');
    res.json(notification);
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error marking notification as read:', error);
    res.status(400).json({ message: error.message });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Mark all notifications as read request received');
  
  try {
    const result = await Notification.updateMany({ read: false }, { read: true });
    console.log('✅ [Teacher Notifications] Marked', result.modifiedCount, 'notifications as read');
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error marking all notifications as read:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mark all notifications as read by leader
exports.markAllAsReadByLeader = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Mark all notifications as read by leader request received');
  console.log('🔔 [Teacher Notifications] Leader name:', req.params.leaderName);
  
  try {
    const { leaderName } = req.params;
    const result = await Notification.updateMany({ leaderName, read: false }, { read: true });
    console.log('✅ [Teacher Notifications] Marked', result.modifiedCount, 'notifications as read for leader:', leaderName);
    res.json({ message: 'All notifications marked as read for this leader' });
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error marking all notifications as read by leader:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  console.log('🔔 [Teacher Notifications] Delete notification request received');
  console.log('🔔 [Teacher Notifications] Notification ID:', req.params.id);
  
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      console.log('⚠️ [Teacher Notifications] Notification not found:', req.params.id);
      return res.status(404).json({ message: 'Notification not found' });
    }
    console.log('✅ [Teacher Notifications] Notification deleted successfully');
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('❌ [Teacher Notifications] Error deleting notification:', error);
    res.status(500).json({ message: error.message });
  }
};
