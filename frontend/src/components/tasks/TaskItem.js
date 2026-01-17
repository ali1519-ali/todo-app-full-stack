// frontend/src/components/tasks/TaskItem.js
import { useState, useEffect } from 'react';

const TaskItem = ({ task, userId, authToken, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || ''
  });
  const [error, setError] = useState('');

  const handleToggleComplete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/tasks/${task.id}/complete`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: !task.completed })
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.status}`);
      }

      // Refresh the task list
      onUpdate();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: task.title,
      description: task.description || ''
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/tasks/${task.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editData)
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.status}`);
      }

      setIsEditing(false);
      // Refresh the task list
      onUpdate();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: task.title,
      description: task.description || ''
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/tasks/${task.id}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authToken}`,
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to delete task: ${response.status}`);
        }

        // Refresh the task list
        onUpdate();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`task-item bg-white/90 backdrop-blur-lg p-6 mb-4 rounded-2xl border-l-4 ${task.completed ? 'border-green-500' : 'border-indigo-500'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up`}>
      {error && (
        <div className="error-message mb-4 p-3 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 rounded-xl border border-red-200 animate-shake">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {isEditing ? (
        <div className="task-edit-form animate-fade-in-up">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3.5 pl-12 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg font-medium mb-4 bg-white/80 backdrop-blur-sm transition-all duration-300"
            required
            placeholder="Task title..."
          />
          <div className="relative mb-4">
            <textarea
              name="description"
              value={editData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3.5 pl-12 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
              rows="3"
              placeholder="Task description..."
            />
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <svg className="h-6 w-6 text-indigo-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
          </div>
          <div className="task-actions flex space-x-3 animate-fade-in-up delay-100">
            <button onClick={handleSave} className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-bold rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save
            </button>
            <button onClick={handleCancel} className="inline-flex items-center px-4 py-2.5 border border-gray-300 text-sm font-bold rounded-lg text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="task-content">
          <div className="task-header flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center h-7 w-7 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={handleToggleComplete}
                  className="h-6 w-6 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <span className={`task-title ml-3 ${task.completed ? 'completed text-gray-500 line-through decoration-gray-400' : 'text-gray-800 font-bold'}`}>
                {task.title}
              </span>
            </div>
            <span className={`task-status px-4 py-1.5 text-xs font-bold rounded-full ${task.completed ? 'status-completed bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' : 'status-pending bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800'} shadow-inner`}>
              {task.completed ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1 h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Completed
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1 h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Pending
                </>
              )}
            </span>
          </div>

          {task.description && (
            <div className="task-description mt-4 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl text-gray-700 border border-gray-200 shadow-sm">
              {task.description}
            </div>
          )}

          <div className="task-meta mt-4 flex justify-between items-center">
            <span className="task-date text-sm text-gray-500 italic flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-1 h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {new Date(task.created_at).toLocaleDateString()}
            </span>
            <div className="task-actions flex space-x-2">
              <button 
                onClick={handleEdit} 
                className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm font-bold rounded-lg text-indigo-700 bg-gradient-to-r from-indigo-100 to-blue-100 hover:from-indigo-200 hover:to-blue-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-md transform transition-all duration-300 hover:scale-[1.05]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button 
                onClick={handleDelete} 
                className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm font-bold rounded-lg text-red-700 bg-gradient-to-r from-red-100 to-rose-100 hover:from-red-200 hover:to-rose-200 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-md transform transition-all duration-300 hover:scale-[1.05]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;