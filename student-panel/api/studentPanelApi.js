const API_BASE_URL = 'http://localhost:5001';

// Student Ideas API
export const submitIdea = async (ideaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/student-ideas/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ideaData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting idea:', error);
    return { success: false, message: 'Error submitting idea', error: error.message };
  }
};

export const getAllIdeas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/student-ideas/all`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return { success: false, message: 'Error fetching ideas', error: error.message };
  }
};

export const getIdeasByLeader = async (leaderName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/student-ideas/leader/${encodeURIComponent(leaderName)}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching ideas by leader:', error);
    return { success: false, message: 'Error fetching ideas', error: error.message };
  }
};

export const getIdeaStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/student-ideas/stats`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching idea stats:', error);
    return { success: false, message: 'Error fetching idea stats', error: error.message };
  }
};

// Teacher Uploads API
export const getAllUploads = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/teacher-uploads/all`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching uploads:', error);
    return { success: false, message: 'Error fetching uploads', error: error.message };
  }
};

export const getUploadById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/teacher-uploads/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching upload:', error);
    return { success: false, message: 'Error fetching upload', error: error.message };
  }
};

// Tasks API
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, message: 'Error creating task', error: error.message };
  }
};

export const getTasksByProject = async (projectName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/project/${encodeURIComponent(projectName)}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return { success: false, message: 'Error fetching tasks', error: error.message };
  }
};

export const toggleTaskStatus = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/toggle/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error toggling task status:', error);
    return { success: false, message: 'Error toggling task status', error: error.message };
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting task:', error);
    return { success: false, message: 'Error deleting task', error: error.message };
  }
};

export const getTaskStats = async (projectName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/stats/${encodeURIComponent(projectName)}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching task stats:', error);
    return { success: false, message: 'Error fetching task stats', error: error.message };
  }
};

// Teams API
export const saveTeam = async (teamData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/teams/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving team:', error);
    return { success: false, message: 'Error saving team', error: error.message };
  }
};

export const getTeamByProject = async (projectName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/teams/project/${encodeURIComponent(projectName)}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching team:', error);
    return { success: false, message: 'Error fetching team', error: error.message };
  }
};

export const verifyLeaderPassword = async (projectName, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/teams/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectName, password }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error verifying password:', error);
    return { success: false, message: 'Error verifying password', error: error.message };
  }
};

export const updateProjectName = async (oldProjectName, newProjectName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/teams/project-name`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldProjectName, newProjectName }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating project name:', error);
    return { success: false, message: 'Error updating project name', error: error.message };
  }
};

// Feedback API
export const getFeedbackByLeader = async (leaderName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedback/leader/${encodeURIComponent(leaderName)}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return { success: false, message: 'Error fetching feedback', error: error.message };
  }
};

export const getAllFeedback = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedback/all`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching all feedback:', error);
    return { success: false, message: 'Error fetching all feedback', error: error.message };
  }
};

// Notifications API
export const getAllNotifications = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/all`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { success: false, message: 'Error fetching notifications', error: error.message };
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/read/${notificationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return { success: false, message: 'Error marking notification as read', error: error.message };
  }
};
