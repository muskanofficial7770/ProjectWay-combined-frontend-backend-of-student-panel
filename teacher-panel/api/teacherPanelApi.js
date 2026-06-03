import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const teacherPanelApi = {
  // ==================== IDEAS API ====================
  ideas: {
    // Get all ideas
    getAllIdeas: async () => {
      try {
        const response = await api.get('/ideas');
        return response.data;
      } catch (error) {
        console.error('Error fetching ideas:', error);
        throw error;
      }
    },

    // Get idea by ID
    getIdeaById: async (id) => {
      try {
        const response = await api.get(`/ideas/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching idea:', error);
        throw error;
      }
    },

    // Create new idea
    createIdea: async (ideaData) => {
      try {
        const response = await api.post('/ideas', ideaData);
        return response.data;
      } catch (error) {
        console.error('Error creating idea:', error);
        throw error;
      }
    },

    // Update idea
    updateIdea: async (id, ideaData) => {
      try {
        const response = await api.put(`/ideas/${id}`, ideaData);
        return response.data;
      } catch (error) {
        console.error('Error updating idea:', error);
        throw error;
      }
    },

    // Update idea status
    updateIdeaStatus: async (id, status) => {
      try {
        const response = await api.patch(`/ideas/${id}/status`, { status });
        return response.data;
      } catch (error) {
        console.error('Error updating idea status:', error);
        throw error;
      }
    },

    // Delete idea
    deleteIdea: async (id) => {
      try {
        const response = await api.delete(`/ideas/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting idea:', error);
        throw error;
      }
    },

    // Get ideas by status
    getIdeasByStatus: async (status) => {
      try {
        const response = await api.get(`/ideas/status/${status}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching ideas by status:', error);
        throw error;
      }
    },

    // Get ideas by session
    getIdeasBySession: async (session) => {
      try {
        const response = await api.get(`/ideas/session/${session}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching ideas by session:', error);
        throw error;
      }
    },
  },

  // ==================== ISSUES API ====================
  issues: {
    // Get all issues
    getAllIssues: async () => {
      try {
        const response = await api.get('/issues');
        return response.data;
      } catch (error) {
        console.error('Error fetching issues:', error);
        throw error;
      }
    },

    // Get issue by ID
    getIssueById: async (id) => {
      try {
        const response = await api.get(`/issues/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching issue:', error);
        throw error;
      }
    },

    // Create new issue
    createIssue: async (issueData) => {
      try {
        const response = await api.post('/issues', issueData);
        return response.data;
      } catch (error) {
        console.error('Error creating issue:', error);
        throw error;
      }
    },

    // Reply to issue
    replyToIssue: async (id, teacherReply) => {
      try {
        const response = await api.put(`/issues/${id}/reply`, { teacherReply });
        return response.data;
      } catch (error) {
        console.error('Error replying to issue:', error);
        throw error;
      }
    },

    // Update issue status
    updateIssueStatus: async (id, status) => {
      try {
        const response = await api.patch(`/issues/${id}/status`, { status });
        return response.data;
      } catch (error) {
        console.error('Error updating issue status:', error);
        throw error;
      }
    },

    // Delete issue
    deleteIssue: async (id) => {
      try {
        const response = await api.delete(`/issues/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting issue:', error);
        throw error;
      }
    },

    // Get issues by category
    getIssuesByCategory: async (category) => {
      try {
        const response = await api.get(`/issues/category/${category}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching issues by category:', error);
        throw error;
      }
    },
  },

  // ==================== FEEDBACK API ====================
  feedback: {
    // Get all feedback
    getAllFeedback: async () => {
      try {
        const response = await api.get('/feedback');
        return response.data;
      } catch (error) {
        console.error('Error fetching feedback:', error);
        throw error;
      }
    },

    // Get feedback by ID
    getFeedbackById: async (id) => {
      try {
        const response = await api.get(`/feedback/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching feedback:', error);
        throw error;
      }
    },

    // Get feedback by idea ID
    getFeedbackByIdeaId: async (ideaId) => {
      try {
        const response = await api.get(`/feedback/idea/${ideaId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching feedback by idea:', error);
        throw error;
      }
    },

    // Create new feedback
    createFeedback: async (feedbackData) => {
      try {
        const response = await api.post('/feedback', feedbackData);
        return response.data;
      } catch (error) {
        console.error('Error creating feedback:', error);
        throw error;
      }
    },

    // Delete feedback
    deleteFeedback: async (id) => {
      try {
        const response = await api.delete(`/feedback/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting feedback:', error);
        throw error;
      }
    },
  },

  // ==================== UPLOADS API ====================
  uploads: {
    // Get all uploads
    getAllUploads: async () => {
      try {
        const response = await api.get('/uploads');
        return response.data;
      } catch (error) {
        console.error('Error fetching uploads:', error);
        throw error;
      }
    },

    // Get upload by ID
    getUploadById: async (id) => {
      try {
        const response = await api.get(`/uploads/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching upload:', error);
        throw error;
      }
    },

    // Create new upload
    createUpload: async (uploadData) => {
      try {
        const response = await api.post('/uploads', uploadData);
        return response.data;
      } catch (error) {
        console.error('Error creating upload:', error);
        throw error;
      }
    },

    // Delete upload
    deleteUpload: async (id) => {
      try {
        const response = await api.delete(`/uploads/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting upload:', error);
        throw error;
      }
    },

    // Get uploads by teacher
    getUploadsByTeacher: async (teacherName) => {
      try {
        const response = await api.get(`/uploads/teacher/${teacherName}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching uploads by teacher:', error);
        throw error;
      }
    },
  },

  // ==================== PROGRESS API ====================
  progress: {
    // Get all progress
    getAllProgress: async () => {
      try {
        const response = await api.get('/progress');
        return response.data;
      } catch (error) {
        console.error('Error fetching progress:', error);
        throw error;
      }
    },

    // Get progress by ID
    getProgressById: async (id) => {
      try {
        const response = await api.get(`/progress/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching progress:', error);
        throw error;
      }
    },

    // Get progress by leader name
    getProgressByLeaderName: async (leaderName) => {
      try {
        const response = await api.get(`/progress/leader/${leaderName}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching progress by leader:', error);
        throw error;
      }
    },

    // Create new progress
    createProgress: async (progressData) => {
      try {
        const response = await api.post('/progress', progressData);
        return response.data;
      } catch (error) {
        console.error('Error creating progress:', error);
        throw error;
      }
    },

    // Update progress
    updateProgress: async (id, progressData) => {
      try {
        const response = await api.put(`/progress/${id}`, progressData);
        return response.data;
      } catch (error) {
        console.error('Error updating progress:', error);
        throw error;
      }
    },

    // Update progress percentage
    updateProgressPercentage: async (id, progress) => {
      try {
        const response = await api.patch(`/progress/${id}/progress`, { progress });
        return response.data;
      } catch (error) {
        console.error('Error updating progress percentage:', error);
        throw error;
      }
    },

    // Add task to progress
    addTask: async (id, taskData) => {
      try {
        const response = await api.post(`/progress/${id}/tasks`, taskData);
        return response.data;
      } catch (error) {
        console.error('Error adding task:', error);
        throw error;
      }
    },

    // Update task status
    updateTaskStatus: async (id, taskId, status) => {
      try {
        const response = await api.patch(`/progress/${id}/tasks/${taskId}`, { status });
        return response.data;
      } catch (error) {
        console.error('Error updating task status:', error);
        throw error;
      }
    },

    // Delete progress
    deleteProgress: async (id) => {
      try {
        const response = await api.delete(`/progress/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting progress:', error);
        throw error;
      }
    },
  },

  // ==================== NOTIFICATIONS API ====================
  notifications: {
    // Get all notifications
    getAllNotifications: async () => {
      try {
        const response = await api.get('/notifications');
        return response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
      }
    },

    // Get notification by ID
    getNotificationById: async (id) => {
      try {
        const response = await api.get(`/notifications/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching notification:', error);
        throw error;
      }
    },

    // Get unread count
    getUnreadCount: async () => {
      try {
        const response = await api.get('/notifications/unread/count');
        return response.data;
      } catch (error) {
        console.error('Error fetching unread count:', error);
        throw error;
      }
    },

    // Create new notification
    createNotification: async (notificationData) => {
      try {
        const response = await api.post('/notifications', notificationData);
        return response.data;
      } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
      }
    },

    // Mark as read
    markAsRead: async (id) => {
      try {
        const response = await api.patch(`/notifications/${id}/read`);
        return response.data;
      } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
      }
    },

    // Mark all as read
    markAllAsRead: async () => {
      try {
        const response = await api.patch('/notifications/read-all');
        return response.data;
      } catch (error) {
        console.error('Error marking all as read:', error);
        throw error;
      }
    },

    // Delete notification
    deleteNotification: async (id) => {
      try {
        const response = await api.delete(`/notifications/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
      }
    },
  },

  // ==================== HEALTH CHECK API ====================
  health: {
    checkHealth: async () => {
      try {
        const response = await api.get('/health');
        return response.data;
      } catch (error) {
        console.error('Error checking health:', error);
        throw error;
      }
    },
  },
};

export default teacherPanelApi;
