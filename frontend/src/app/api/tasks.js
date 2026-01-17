// frontend/src/app/api/tasks.js
// This file would contain utility functions for interacting with the tasks API
// In a real implementation, this would be used by the components to make API calls

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Fetch all tasks for a user
 */
export const fetchUserTasks = async (userId, authToken, filters = {}) => {
  const { status = 'all', sortBy = 'created' } = filters;
  
  const response = await fetch(
    `${API_BASE_URL}/api/users/${userId}/tasks?status_filter=${status}&sort_by=${sortBy}`, 
    {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  return response.json();
};

/**
 * Create a new task for a user
 */
export const createUserTask = async (userId, taskData, authToken) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/tasks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task: ${response.status}`);
  }

  return response.json();
};

/**
 * Update a task
 */
export const updateUserTask = async (userId, taskId, taskData, authToken) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.status}`);
  }

  return response.json();
};

/**
 * Delete a task
 */
export const deleteUserTask = async (userId, taskId, authToken) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.status}`);
  }

  return response.status; // Will be 204 for successful deletion
};

/**
 * Update task completion status
 */
export const updateTaskCompletion = async (userId, taskId, completed, authToken) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/tasks/${taskId}/complete`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task completion: ${response.status}`);
  }

  return response.json();
};